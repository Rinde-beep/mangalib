import Core.Models.manga as m
from Core.Models.Base import async_session_maker
from sqlalchemy import select, and_, not_
from Core.BaseDAO import BaseDAO
from PIL import Image
import io

class CatalogDAO(BaseDAO):
    model = m.Mangas

    @classmethod
    async def see_catalog(cls, page: int, filter: str | None, sort: str | None, genre_in: list[str] | str, genre_ex: list[str] | str) -> list[m.Mangas]:
        async with async_session_maker() as ses:
            query = select(m.Mangas).offset(page * 10).limit(10).where(and_((and_(m.Mangas.tags.contains(x) for x in genre_in)) if genre_in else True), ((not_(and_(m.Mangas.tags.contains(x) for x in genre_ex))) if genre_ex else True))
            res = await ses.execute(query)
            result = res.scalars().all()
            print(result, type(result))
            for i in result:
                
                image_data = i.picture
                image = Image.open(io.BytesIO(image_data))
                i.picture = image.show()
            return result



