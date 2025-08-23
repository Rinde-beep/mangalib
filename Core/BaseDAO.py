from Core.Models.Base import async_session_maker
from sqlalchemy import insert, select
from sqlalchemy.exc import NoResultFound
class BaseDAO():
    model = None
    
    @classmethod
    async def find_by_id(cls, id: int):
        async with async_session_maker() as ses:
            try:
                res = await ses.get(cls.model, id)
            except NoResultFound:
                return None
            
            return res
        
    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as ses:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            try:
                res = await ses.execute(query)
                result = res.mappings().one()
            except NoResultFound:
                return None
            return result
    
    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as ses:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            res = await ses.execute(query)
            return res.mappings().all()
        
    @classmethod
    async def insert_data(cls, **values):
        async with async_session_maker() as ses:
            data = cls.model(**values)
            ses.add(data)
            await ses.commit()

        
    

