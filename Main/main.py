from fastapi import FastAPI
from Catalog.catalog_views import router as catalog_router
from Manga.manga_views import router as manga_router
from User.user_views import router as user_router
from Review.review_views import router as review_router
from fastapi.middleware.cors import CORSMiddleware
from Auth.main import router as auth_router
from Comment.comment_views import router as comment_router

from contextlib import asynccontextmanager

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from redis import asyncio as aioredis
import asyncio

from Core.Models.Base import engine
from sqladmin import Admin

from Admin_ka.Classes import UserAdmin, MangaAdmin, ReviewAdmin, CommentAdmin

from Core.Models.Base import async_session_maker
from sqlalchemy import select
from Core.Models.manga import Mangas

@asynccontextmanager
async def lifespan(app: FastAPI):
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware, allow_origins=['*']
)
app.include_router(auth_router)
app.include_router(catalog_router)
app.include_router(manga_router)
app.include_router(user_router)
app.include_router(review_router)
app.include_router(comment_router)


admin = Admin(app, engine)


admin.add_view(UserAdmin)
admin.add_view(MangaAdmin)
admin.add_view(ReviewAdmin)
admin.add_view(CommentAdmin)

@app.get("/api/", tags=["Main"])
@cache(expire=30)
async def main_page():
    await asyncio.sleep(3)
    return ""
