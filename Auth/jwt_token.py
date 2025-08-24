
import datetime
from User.schemas import UserReg
from Core.config import settings
from pydantic import EmailStr
from Auth.crud import AuthDAO
from werkzeug.security import check_password_hash
import jwt

def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire =  datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITM)
    return encoded_jwt

async def auth_user(email: EmailStr, password: str):
    user = await AuthDAO.find_one_or_none(email=email)
    if not user and not check_password_hash(password, user.password):
        return None
    return user





