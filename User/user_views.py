from fastapi import APIRouter, Depends
from User.schemas import User
import User.crud as crud
from Auth.crud import AuthDAO
from Auth.depend import get_user
from fastapi_cache.decorator import cache
router = APIRouter(prefix="/api/user", tags=["User"])


@router.get("/")
def all_users():
    pass

@router.get("/profile")
@cache(expire=30)
def user_profile(user = Depends(get_user)):
    return user


@router.get("/{id}/bookmarks")
def bookmarks(id: int, status: int):
    pass

@router.post("/add")
def user_add(user: User):
    crud.create_user(user)
    pass
