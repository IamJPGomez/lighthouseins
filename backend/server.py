from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from bot_renderer import get_rendered_html


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env', override=False)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Bot rendering middleware
@app.middleware("http")
async def bot_render_middleware(request: Request, call_next):
    """
    Middleware to detect bots and serve pre-rendered HTML.
    """
    # Only handle GET requests for HTML pages (not API calls or static files)
    if request.method == "GET" and not request.url.path.startswith("/api") and not request.url.path.startswith("/static"):
        user_agent = request.headers.get("user-agent", "")
        
        # Construct the frontend URL
        frontend_url = f"http://localhost:3000{request.url.path}"
        if request.url.query:
            frontend_url += f"?{request.url.query}"
        
        # Try to get rendered HTML for bots
        rendered_html = await get_rendered_html(frontend_url, user_agent)
        
        if rendered_html:
            # Return pre-rendered HTML to bot
            return HTMLResponse(content=rendered_html)
    
    # For non-bots or API calls, continue normally
    response = await call_next(request)
    return response


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/render-test")
async def render_test(url: str = "http://localhost:3000"):
    """
    Test endpoint to verify bot rendering works.
    Usage: /api/render-test?url=http://localhost:3000/about
    """
    from bot_renderer import render_page_with_playwright
    html = await render_page_with_playwright(url, timeout=15000)
    if html:
        return HTMLResponse(content=html)
    else:
        return {"error": "Failed to render page"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()