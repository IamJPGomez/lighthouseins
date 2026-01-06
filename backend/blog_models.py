"""
Blog post models and CRUD operations
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import uuid


class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str  # HTML content from rich text editor
    category: str
    author: str = "Luis Rodriguez"
    read_time: str = "5 min read"
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    status: str = "draft"  # draft or published
    scheduled_date: Optional[datetime] = None


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    read_time: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    status: Optional[str] = None
    scheduled_date: Optional[datetime] = None


class BlogPost(BlogPostBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    published_at: Optional[datetime] = None
    
    model_config = {"from_attributes": True}


class BlogPostList(BaseModel):
    posts: List[BlogPost]
    total: int
    page: int
    per_page: int
