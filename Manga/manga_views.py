from fastapi import APIRouter
from Manga.schemas import Manga
import Manga.crud as crud
from Core.Models.Base import async_session_maker
from Core.Models.manga import Mangas
from sqlalchemy import select
from Manga.crud import MangaDAO

router = APIRouter(prefix="/api/manga", tags=["Manga"])

@router.get("/{name}")
async def manga_description(name: str) -> Manga | None:
    res = await MangaDAO.select_manga_description(name)
    return res

@router.get("/{id}")
async def manga_with_id(id: int) -> Manga | None:
    res = await MangaDAO.find_with_id(id)
    return res

@router.get("/{name}/read/{tom}/{chapter}")
async def manga_read(name: str, tom: int, head: int, page: int):
    res = await MangaDAO.read_manga(name, tom, head, page)
    return res

@router.post("/add")
async def manga_add(manga: Manga):
    res = await MangaDAO.create_manga(manga)
    return res 

