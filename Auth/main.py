from fastapi import APIRouter, Depends, HTTPException, status, Response
from Auth.depend import get_token, get_user
from User.schemas import User, UserReg
from Auth.crud import AuthDAO
from werkzeug.security import generate_password_hash, check_password_hash
from Auth.jwt_token import auth_user, create_jwt_token
from Auth.exceptions import IncorrectUserData


router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/reg")
async def reg_user(user: UserReg):
    email = user.email
    password = generate_password_hash(user.password)
    user = await AuthDAO.find_one_or_none(email=email)
    if user:
        raise IncorrectUserData
    await AuthDAO.insert_data(email=email, password=password)

@router.post("/login")
async def login_user(response: Response, user: UserReg):
    log_user = await auth_user(user.email, user.password)
    if not log_user:
        raise IncorrectUserData
    token = create_jwt_token({"sub": str(log_user.id)})
    response.set_cookie("acs_token", token, httponly=True)

@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("acs_token")
    
        

