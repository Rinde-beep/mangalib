import Core.Models.manga as m
from Core.Models.Base import async_session_maker
from sqlalchemy import select, and_, not_
from Core.BaseDAO import BaseDAO
from PIL import Image
import io
import base64

class CatalogDAO(BaseDAO):
    model = m.Mangas

    @classmethod
    async def see_catalog(cls, page: int, genre_in: list[str] | str, genre_ex: list[str] | str, order: str, desc: bool | None = False) -> list[m.Mangas]:
        async with async_session_maker() as ses:
            if order == "rating":
                order_by = m.Mangas.rating
            elif order == "chapter":
                order_by = m.Mangas.chapter_size
            elif order == "volume":
                order_by = m.Mangas.volume_size
            else:
                order_by = m.Mangas.id

            query = select(m.Mangas).offset(page * 12).limit(12).where(and_((and_(m.Mangas.tags.contains(x) for x in genre_in)) if genre_in else True), ((not_(and_(m.Mangas.tags.contains(x) for x in genre_ex))) if genre_ex else True)).order_by(order_by if desc == False else order_by.desc())
            res = await ses.execute(query)
            result = res.scalars().all()
            for i in result:
                image_data = i.picture
                
                i.picture = base64.b64encode(image_data).decode("utf-8")
            return result



