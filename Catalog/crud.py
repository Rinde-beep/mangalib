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

            query = select(m.Mangas.id, 
                           m.Mangas.alternative_name, 
                           m.Mangas.name, 
                           m.Mangas.author, 
                           m.Mangas.volume_size,
                           m.Mangas.chapter_size,
                           m.Mangas.description, 
                           m.Mangas.izdat,
                           m.Mangas.rating,
                           m.Mangas.rating_1, 
                           m.Mangas.rating_2, 
                           m.Mangas.rating_3, 
                           m.Mangas.rating_4, 
                           m.Mangas.rating_5, 
                           m.Mangas.rating_6,
                           m.Mangas.rating_7, 
                           m.Mangas.rating_8,
                           m.Mangas.rating_9,
                           m.Mangas.rating_10,
                           m.Mangas.status,
                           m.Mangas.tags,
                           m.Mangas.time ).offset(
                page * 12
                ).limit(
                    12
                    ).where(
                        and_(
                            (and_(
                                m.Mangas.tags.contains([x]) for x in genre_in
                                )) if genre_in else True)
                                , ((not_(and_(m.Mangas.tags.contains([x]) for x in genre_ex))) 
                                   if genre_ex else True)).order_by(
                                       order_by if desc == False else order_by.desc())
            res = await ses.execute(query)
            result = res.mappings().all()
            return result



