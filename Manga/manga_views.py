from fastapi import APIRouter
from Manga.schemas import Manga, MangaAdd
import Manga.crud as crud
from Core.Models.Base import async_session_maker
from Core.Models.manga import Mangas
from sqlalchemy import select
from Manga.crud import MangaDAO
from fastapi_cache.decorator import cache



router = APIRouter(prefix="/api/manga", tags=["Manga"])


@router.get("/{name}")
# @cache(expire=30)
async def manga_description(name: str) -> Manga | None:
    manga = await MangaDAO.find_one_or_none(name=name)
    return manga

@router.get("/id/{id}")
# @cache(expire=30)
async def manga_with_id(id: int) -> Manga | None:
    manga = await MangaDAO.find_by_id(id)
    return manga


@router.post("/add")
async def manga_add(manga: MangaAdd):
    res = await MangaDAO.insert_data(name=manga.name,
                description=manga.description,
                tags=manga.tags,
                rating=manga.rating,
                chapter_size=manga.chapter_size,
                volume_size=manga.volume_size,
                status=manga.status) 
    return res 


