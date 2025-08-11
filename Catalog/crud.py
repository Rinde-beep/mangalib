from Core.Models.manga import Mangas
from Core.Models.Base import async_session_maker
from sqlalchemy import select, and_, not_

class CatalogDAO:

    @classmethod
    async def see_catalog(cls, genre_in: list[str], genre_ex, page: int) -> list[Mangas]:
        async with async_session_maker() as ses:
            
            query = select(Mangas).offset(page * 10).limit(10).where(and_(and_(Mangas.tags.contains(x) for x in genre_in), and_(not_(Mangas.tags.contains(x)) for x in genre_ex)))
            res = await ses.execute(query)
            print("*".join(genre_in))
            return res.mappings().all()


