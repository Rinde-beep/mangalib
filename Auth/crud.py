from jose import jwt
from werkzeug.security import check_password_hash, generate_password_hash
from pydantic import EmailStr
from Core.Models.Base import async_session_maker
from sqlalchemy import insert
from Core.Models.user import Users
from Core.BaseDAO import BaseDAO

class AuthDAO(BaseDAO):
    model = Users

