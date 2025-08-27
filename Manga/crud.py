from Manga.schemas import Manga
from Core.Models.Base import async_session_maker
from sqlalchemy import select, insert
from sqlalchemy.orm import selectinload, joinedload
from Core.Models.manga import Mangas
from sqlalchemy.exc import NoResultFound
from Core.BaseDAO import BaseDAO
from PIL import Image
import io

class MangaDAO(BaseDAO):
    model = Mangas
    @classmethod
    async def find_by_id(cls, id):
        async with async_session_maker() as ses:
            manga = await ses.get(cls.model, id)
            return Manga(id=manga.id,
                        name=manga.name,
                        alternative_name=manga.alternative_name,
                        description=manga.description,
                        tags=manga.tags,
                        rating=manga.rating,
                        chapter_size=manga.chapter_size,
                        volume_size=manga.volume_size,
                        status=manga.status,
                        time=manga.time,
                        author=manga.author,
                        izdat=manga.izdat,
                        rating_10=manga.rating_10,
                        rating_9=manga.rating_9,
                        rating_8=manga.rating_8,
                        rating_7=manga.rating_7,
                        rating_6=manga.rating_6,
                        rating_5=manga.rating_5,
                        rating_4=manga.rating_4,
                        rating_3=manga.rating_3,
                        rating_2=manga.rating_2,
                        rating_1=manga.rating_1), manga.review
        
    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as ses:
            query = select(cls.model).filter_by(**filter_by).options(joinedload(cls.model.review), selectinload(cls.model.comment), selectinload(cls.model.list))
            try:
                manga = await ses.execute(query)
                
                manga = manga.scalars().first()
            except NoResultFound:
                return None
            return Manga(id=manga.id,
                        name=manga.name,
                        alternative_name=manga.alternative_name,
                        description=manga.description,
                        tags=manga.tags,
                        rating=manga.rating,
                        chapter_size=manga.chapter_size,
                        volume_size=manga.volume_size,
                        status=manga.status,
                        time=manga.time,
                        author=manga.author,
                        izdat=manga.izdat,
                        rating_10=manga.rating_10,
                        rating_9=manga.rating_9,
                        rating_8=manga.rating_8,
                        rating_7=manga.rating_7,
                        rating_6=manga.rating_6,
                        rating_5=manga.rating_5,
                        rating_4=manga.rating_4,
                        rating_3=manga.rating_3,
                        rating_2=manga.rating_2,
                        rating_1=manga.rating_1,), manga.review, manga.comment, manga.list

    
    
                




