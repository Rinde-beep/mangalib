from fastapi import Depends, Request, HTTPException
from Auth.crud import AuthDAO
from Core.config import settings
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from Auth.exceptions import InvalidJWTTokenError, AlreadyExistsUser, IncorrectUserData
async def get_token(request: Request):
    token = request.cookies.get("acs_token")
    print(token)
    if not token:
        raise InvalidJWTTokenError
    return token

async def get_user(token = Depends(get_token)):
    try:
        data = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITM])
    except (InvalidTokenError, ExpiredSignatureError):
        raise InvalidJWTTokenError
    user_id = data.get("sub")
    if not user_id:
        raise HTTPException(status_code=401)
    user = await AuthDAO.find_by_id(int(user_id))
    if not user:
        raise IncorrectUserData
    return user
