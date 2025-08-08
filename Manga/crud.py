from Manga.schemas import Manga
from Core.Models.Base import async_session_maker
from sqlalchemy import select, insert
from Core.Models.manga import Mangas
from Core.Models.page import Pages
from sqlalchemy.exc import NoResultFound

class MangaDAO:

    @classmethod
    async def select_manga_description(cls, name: str) -> Manga | None:
        async with async_session_maker() as ses:
            try:
                query = select(Mangas.__table__.columns).where(Mangas.name==name)
                res = await ses.execute(query)
                result = res.mappings().one()
                return result
            except NoResultFound:
                return None
            

    @classmethod
    async def create_manga(cls, manga: Manga):
        async with async_session_maker() as ses:
            query = insert(Mangas).values(
                preview_picture_id=manga.preview_picture_id,
                name=manga.name,
                description=manga.description,
                tags=manga.tags,
                rating=manga.rating,
                author=manga.author,
                artist=manga.artist,
                chapter_size=manga.chapter_size,
                volume_size=manga.volume_size,
                status=manga.status)
            await ses.execute(query)
            await ses.commit()
            return {"msg": "success"}
        

    @classmethod
    async def read_manga(cls, name: str, volume: str, chapter: str, page: str):
        async with async_session_maker() as ses:
            query = select(Mangas.id).filter_by(name=name)
            id = await ses.execute(query)
            query2 = select(Pages.page_id).filter_by(volume=volume, chapter=chapter, page=page, manga_id=id.mappings().one().get("id"))
            res = await ses.execute(query2)
            return res.mappings().one()



