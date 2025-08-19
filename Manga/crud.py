from Manga.schemas import Manga
from Core.Models.Base import async_session_maker
from sqlalchemy import select, insert
from Core.Models.manga import Mangas
from sqlalchemy.exc import NoResultFound
from Core.BaseDAO import BaseDAO

class MangaDAO(BaseDAO):
    model = Mangas
        




