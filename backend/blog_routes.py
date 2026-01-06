"""
Blog API routes for CMS
"""
from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from datetime import datetime, timezone
from blog_models import BlogPost, BlogPostCreate, BlogPostUpdate, BlogPostList
from auth import verify_token
import logging

logger = logging.getLogger(__name__)

# Create blog router
blog_router = APIRouter(prefix="/api/blog", tags=["blog"])


# Dependency to verify authentication
async def get_current_user(authorization: str = Header(None)) -> str:
    """Verify JWT token from Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    username = verify_token(token)
    
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return username


# Public endpoints (no auth required)
@blog_router.get("/posts", response_model=BlogPostList)
async def get_published_posts(
    page: int = 1,
    per_page: int = 10,
    category: Optional[str] = None
):
    """Get published blog posts (public endpoint)."""
    from server import db
    
    # Build query - only published posts
    query = {"status": "published"}
    
    # Add category filter if provided
    if category:
        query["category"] = category
    
    # Get total count
    total = await db.blog_posts.count_documents(query)
    
    # Get paginated posts, sorted by published_at descending
    skip = (page - 1) * per_page
    cursor = db.blog_posts.find(query).sort("published_at", -1).skip(skip).limit(per_page)
    posts = await cursor.to_list(length=per_page)
    
    # Convert to BlogPost models
    blog_posts = [BlogPost(**post) for post in posts]
    
    return BlogPostList(
        posts=blog_posts,
        total=total,
        page=page,
        per_page=per_page
    )


@blog_router.get("/posts/{slug}", response_model=BlogPost)
async def get_post_by_slug(slug: str):
    """Get a single published blog post by slug (public endpoint)."""
    from server import db
    
    post = await db.blog_posts.find_one({"slug": slug, "status": "published"})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return BlogPost(**post)


# Admin endpoints (auth required)
@blog_router.get("/admin/posts", response_model=BlogPostList)
async def get_all_posts_admin(
    page: int = 1,
    per_page: int = 20,
    status: Optional[str] = None,
    current_user: str = Depends(get_current_user)
):
    """Get all blog posts for admin (includes drafts)."""
    from server import db
    
    # Build query
    query = {}
    if status:
        query["status"] = status
    
    # Get total count
    total = await db.blog_posts.count_documents(query)
    
    # Get paginated posts, sorted by updated_at descending
    skip = (page - 1) * per_page
    cursor = db.blog_posts.find(query).sort("updated_at", -1).skip(skip).limit(per_page)
    posts = await cursor.to_list(length=per_page)
    
    # Convert to BlogPost models
    blog_posts = [BlogPost(**post) for post in posts]
    
    return BlogPostList(
        posts=blog_posts,
        total=total,
        page=page,
        per_page=per_page
    )


@blog_router.post("/admin/posts", response_model=BlogPost)
async def create_post(
    post: BlogPostCreate,
    current_user: str = Depends(get_current_user)
):
    """Create a new blog post."""
    from server import db
    
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    
    # Create blog post
    blog_post = BlogPost(**post.model_dump())
    
    # Set published_at if status is published
    if blog_post.status == "published" and not blog_post.published_at:
        blog_post.published_at = datetime.now(timezone.utc)
    
    # Insert into database
    await db.blog_posts.insert_one(blog_post.model_dump())
    
    logger.info(f"Created blog post: {blog_post.title} by {current_user}")
    
    return blog_post


@blog_router.get("/admin/posts/{post_id}", response_model=BlogPost)
async def get_post_by_id_admin(
    post_id: str,
    current_user: str = Depends(get_current_user)
):
    """Get a single blog post by ID (admin)."""
    from server import db
    
    post = await db.blog_posts.find_one({"id": post_id})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return BlogPost(**post)


@blog_router.put("/admin/posts/{post_id}", response_model=BlogPost)
async def update_post(
    post_id: str,
    post_update: BlogPostUpdate,
    current_user: str = Depends(get_current_user)
):
    """Update a blog post."""
    from server import db
    
    # Get existing post
    existing_post = await db.blog_posts.find_one({"id": post_id})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Prepare update data (only non-None fields)
    update_data = {k: v for k, v in post_update.model_dump().items() if v is not None}
    
    # Update updated_at timestamp
    update_data["updated_at"] = datetime.now(timezone.utc)
    
    # If changing status to published and no published_at, set it
    if update_data.get("status") == "published" and not existing_post.get("published_at"):
        update_data["published_at"] = datetime.now(timezone.utc)
    
    # Check if slug is being changed and if it conflicts
    if "slug" in update_data and update_data["slug"] != existing_post["slug"]:
        slug_exists = await db.blog_posts.find_one({"slug": update_data["slug"]})
        if slug_exists:
            raise HTTPException(status_code=400, detail="A post with this slug already exists")
    
    # Update in database
    await db.blog_posts.update_one(
        {"id": post_id},
        {"$set": update_data}
    )
    
    # Get updated post
    updated_post = await db.blog_posts.find_one({"id": post_id})
    
    logger.info(f"Updated blog post: {updated_post['title']} by {current_user}")
    
    return BlogPost(**updated_post)


@blog_router.delete("/admin/posts/{post_id}")
async def delete_post(
    post_id: str,
    current_user: str = Depends(get_current_user)
):
    """Delete a blog post."""
    from server import db
    
    # Check if post exists
    existing_post = await db.blog_posts.find_one({"id": post_id})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Delete from database
    await db.blog_posts.delete_one({"id": post_id})
    
    logger.info(f"Deleted blog post: {existing_post['title']} by {current_user}")
    
    return {"message": "Blog post deleted successfully"}


@blog_router.post("/admin/posts/{post_id}/duplicate", response_model=BlogPost)
async def duplicate_post(
    post_id: str,
    current_user: str = Depends(get_current_user)
):
    """Duplicate a blog post."""
    from server import db
    import uuid
    
    # Get existing post
    existing_post = await db.blog_posts.find_one({"id": post_id})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Create new post with duplicated content
    new_post_data = existing_post.copy()
    
    # Remove MongoDB's _id field to avoid duplicate key error
    if "_id" in new_post_data:
        del new_post_data["_id"]
    
    new_post_data["id"] = str(uuid.uuid4())
    new_post_data["title"] = f"{existing_post['title']} (Copy)"
    new_post_data["slug"] = f"{existing_post['slug']}-copy-{str(uuid.uuid4())[:8]}"
    new_post_data["status"] = "draft"
    new_post_data["created_at"] = datetime.now(timezone.utc)
    new_post_data["updated_at"] = datetime.now(timezone.utc)
    new_post_data["published_at"] = None
    
    # Insert into database
    await db.blog_posts.insert_one(new_post_data)
    
    logger.info(f"Duplicated blog post: {new_post_data['title']} by {current_user}")
    
    return BlogPost(**new_post_data)


@blog_router.get("/categories")
async def get_categories():
    """Get all unique categories."""
    from server import db
    
    categories = await db.blog_posts.distinct("category", {"status": "published"})
    return {"categories": categories}
