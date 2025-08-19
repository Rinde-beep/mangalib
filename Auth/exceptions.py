from fastapi import HTTPException, status


class AuthExceptions(HTTPException):

    status_code = 500
    detail = ""


    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)
    

class InvalidJWTTokenError(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Не валидный jwt-токен"

class IncorrectUserData(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Неправильные данные пользователя"

class AlreadyExistsUser(AuthExceptions):
    status_code=status.HTTP_409_CONFLICT
    detail="Данный пользователь уже имеется"



