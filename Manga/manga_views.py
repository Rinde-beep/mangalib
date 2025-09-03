from fastapi import APIRouter, File, UploadFile
from Manga.schemas import Manga, MangaAdd, MangaRel
import Manga.crud as crud
from Core.Models.Base import async_session_maker
from Core.Models.manga import Mangas
from sqlalchemy import select
from Manga.crud import MangaDAO
from fastapi_cache.decorator import cache
from typing import Annotated


router = APIRouter(prefix="/api/manga", tags=["Manga"])


@router.get("/{name}")
# @cache(expire=30)
async def manga_description(name: str) -> MangaRel | None:
    manga = await MangaDAO.find_one_or_none(name=name)
    return manga

@router.get("/id/{id}")
# @cache(expire=30)
async def manga_with_id(id: int) -> MangaRel | None:
    manga = await MangaDAO.find_by_id(id)
    return manga


@router.post("/add")
async def manga_add(manga: MangaAdd, picture: Annotated[File, UploadFile]):
    res = await MangaDAO.insert_data(**manga.__dict__) 
    return res 


