from Manga.schemas import Manga
from Core.Models.Base import async_session_maker
from sqlalchemy import select, insert
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
            image_data = manga.picture
            image = Image.open(io.BytesIO(image_data))
            manga.picture = image
            return manga
        
    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as ses:
            query = select(cls.model).filter_by(**filter_by)
            try:
                res = await ses.execute(query)
                
                result = res.scalars().first()
                image_data = result.picture
                image = Image.open(io.BytesIO(image_data))
                result.picture = image.show()
            except NoResultFound:
                return None
            return result

    
    
                




