from User.schemas import User
from Core.Models.user import Users
from Core.BaseDAO import BaseDAO
from Core.Models.Base import async_session_maker
from sqlalchemy.exc import NoResultFound
from Auth.exceptions import AlreadyExistsUser


class UserDAO(BaseDAO):
    model = Users

    @classmethod
    async def find_by_id_and_change_login(cls, id: int, login: str):
        async with async_session_maker() as ses:
            try:
                res = await ses.get(cls.model, id)
                if res.login != login:
                    res.login = login
                    await ses.commit()
                

            except NoResultFound:
                return None
            
            
