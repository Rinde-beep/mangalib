from Manga.schemas import Manga, MangaRel
from Core.Models.Base import async_session_maker
from sqlalchemy import select, insert
from sqlalchemy.orm import selectinload, joinedload
from Core.Models.manga import Mangas
from Core.Models.comment import Comments
from Core.Models.review import Reviews
from sqlalchemy.exc import NoResultFound
from Core.BaseDAO import BaseDAO
from Review.schemas import Review
from Comment.schemas import Comment
from PIL import Image
import logging as logg
import io

log = logg.getLogger()

class MangaDAO(BaseDAO):
    model = Mangas

    @classmethod
    async def find_by_id(cls, id):
        async with async_session_maker() as ses:
            manga = await ses.get(cls.model, id)
            res = MangaRel.model_validate(manga, from_attributes=True)
            return res
        
    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as ses:
            query = select(cls.model).filter_by(**filter_by
                                                ).options(selectinload(cls.model.review)
                                                                     ).options(selectinload(cls.model.comment))
            manga = await ses.execute(query)
            manga = manga.unique().scalars().one_or_none()
            res = MangaRel.model_validate(manga, from_attributes=True)
            return res


    
    
                




