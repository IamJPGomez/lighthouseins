from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt

from seed_data import SEED_POSTS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Lighthouse2026!')
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
JWT_ALGO = 'HS256'
JWT_EXP_HOURS = 24 * 7

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ----------------------------- Helpers -----------------------------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(text: str) -> str:
    text = (text or '').lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip('-') or str(uuid.uuid4())[:8]


def serialize_doc(doc: dict) -> dict:
    """Ensure Mongo docs are JSON-serializable (drop _id, stringify datetimes)."""
    if not doc:
        return doc
    doc = {k: v for k, v in doc.items() if k != '_id'}
    for k, v in doc.items():
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


def create_token() -> str:
    payload = {
        'sub': 'admin',
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
        'iat': datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


async def require_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(' ', 1)[1]
    try:
        jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return True


# ----------------------------- Models -----------------------------
class LoginRequest(BaseModel):
    password: str


class FAQItem(BaseModel):
    question: str
    answer: str


class PostBase(BaseModel):
    title: str
    excerpt: str = ""
    content: str = ""
    author: str = "Lighthouse Insurance"
    tags: List[str] = Field(default_factory=list)
    status: str = "draft"  # draft | published
    coverImage: str = ""
    seoTitle: str = ""
    seoDescription: str = ""
    faqs: List[FAQItem] = Field(default_factory=list)
    slug: Optional[str] = None


class PostCreate(PostBase):
    pass


class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str
    phone: str = ""
    email: str = ""
    insuranceType: str = ""
    zip: str = ""
    message: str = ""


# ----------------------------- Routes: health -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Lighthouse Insurance API"}


# ----------------------------- Auth -----------------------------
@api_router.post("/admin/login")
async def admin_login(body: LoginRequest):
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"token": create_token()}


@api_router.get("/admin/verify")
async def admin_verify(_: bool = Depends(require_admin)):
    return {"ok": True}


# ----------------------------- Public blog -----------------------------
@api_router.get("/posts")
async def list_public_posts():
    posts = await db.posts.find({"status": "published"}, {"_id": 0}).to_list(1000)
    posts.sort(key=lambda p: p.get('publishedAt') or p.get('createdAt') or '', reverse=True)
    # Trim heavy content for list view
    for p in posts:
        p.pop('content', None)
    return posts


@api_router.get("/posts/{slug}")
async def get_public_post(slug: str):
    post = await db.posts.find_one({"slug": slug, "status": "published"}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return serialize_doc(post)


# ----------------------------- Admin blog CRUD -----------------------------
@api_router.get("/admin/posts")
async def admin_list_posts(_: bool = Depends(require_admin)):
    posts = await db.posts.find({}, {"_id": 0}).to_list(1000)
    posts.sort(key=lambda p: p.get('updatedAt') or p.get('createdAt') or '', reverse=True)
    for p in posts:
        p.pop('content', None)
    return posts


@api_router.get("/admin/posts/{post_id}")
async def admin_get_post(post_id: str, _: bool = Depends(require_admin)):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return serialize_doc(post)


async def _unique_slug(base: str, exclude_id: Optional[str] = None) -> str:
    slug = base
    i = 2
    while True:
        existing = await db.posts.find_one({"slug": slug})
        if not existing or existing.get('id') == exclude_id:
            return slug
        slug = f"{base}-{i}"
        i += 1


@api_router.post("/admin/posts")
async def admin_create_post(body: PostCreate, _: bool = Depends(require_admin)):
    data = body.model_dump()
    base_slug = slugify(data.get('slug') or data['title'])
    data['slug'] = await _unique_slug(base_slug)
    data['id'] = str(uuid.uuid4())
    data['createdAt'] = now_iso()
    data['updatedAt'] = now_iso()
    data['publishedAt'] = now_iso() if data['status'] == 'published' else None
    await db.posts.insert_one(dict(data))
    return serialize_doc(data)


@api_router.put("/admin/posts/{post_id}")
async def admin_update_post(post_id: str, body: PostCreate, _: bool = Depends(require_admin)):
    existing = await db.posts.find_one({"id": post_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    data = body.model_dump()
    base_slug = slugify(data.get('slug') or data['title'])
    data['slug'] = await _unique_slug(base_slug, exclude_id=post_id)
    data['updatedAt'] = now_iso()
    # Manage publishedAt transitions
    if data['status'] == 'published' and not existing.get('publishedAt'):
        data['publishedAt'] = now_iso()
    else:
        data['publishedAt'] = existing.get('publishedAt')
    await db.posts.update_one({"id": post_id}, {"$set": data})
    merged = {**existing, **data, "id": post_id}
    return serialize_doc(merged)


@api_router.delete("/admin/posts/{post_id}")
async def admin_delete_post(post_id: str, _: bool = Depends(require_admin)):
    res = await db.posts.delete_one({"id": post_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"ok": True}


# ----------------------------- Contact -----------------------------
@api_router.post("/contact")
async def create_contact(body: ContactCreate):
    doc = body.model_dump()
    doc['id'] = str(uuid.uuid4())
    doc['createdAt'] = now_iso()
    doc['status'] = 'new'
    await db.contacts.insert_one(dict(doc))
    return {"ok": True, "message": "Thank you! We'll be in touch shortly."}


@api_router.get("/admin/contacts")
async def admin_list_contacts(_: bool = Depends(require_admin)):
    items = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    items.sort(key=lambda x: x.get('createdAt') or '', reverse=True)
    return items


# ----------------------------- App wiring -----------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_posts():
    """Seed initial blog posts if collection is empty."""
    try:
        count = await db.posts.count_documents({})
        if count == 0:
            docs = []
            for p in SEED_POSTS:
                doc = dict(p)
                doc['id'] = str(uuid.uuid4())
                doc['createdAt'] = now_iso()
                doc['updatedAt'] = now_iso()
                doc['publishedAt'] = now_iso() if doc.get('status') == 'published' else None
                docs.append(doc)
            if docs:
                await db.posts.insert_many(docs)
                logger.info(f"Seeded {len(docs)} blog posts")
    except Exception as e:
        logger.error(f"Seeding failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
