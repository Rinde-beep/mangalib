from fastapi import APIRouter, Depends, HTTPException
from User.schemas import User, UserLogin, UserForProfile
import User.crud as crud
from User.crud import UserDAO
from Auth.depend import get_user
from fastapi_cache.decorator import cache
from werkzeug.security import check_password_hash
router = APIRouter(prefix="/api/user", tags=["User"])


@router.get("/")
async def all_users():
    pass

@router.get("/profile")
@cache(expire=30)
async def user_profile(user = Depends(get_user)) -> UserForProfile:
    return user

@router.post("/change/login")
async def change_login(user_data: UserLogin, user = Depends(get_user)) -> dict:
    if user_data.login == user.login:
        raise HTTPException(status_code=409)
    if check_password_hash(user.password, user_data.password):
        await UserDAO.find_by_id_and_change_login(user.id, user_data.login)
    return {"msg": "success"}
