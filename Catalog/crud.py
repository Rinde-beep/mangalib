from Core.Models.manga import Mangas
from Core.Models.Base import async_session_maker
from sqlalchemy import select

class CatalogDAO:

    @classmethod
    async def see_catalog(cls, genre_in: list[str], genre_ex) -> list[Mangas]:
        async with async_session_maker() as ses:
            query = select(Mangas).filter_by()
            res = await ses.execute(query)
            return res.mappings().all()


