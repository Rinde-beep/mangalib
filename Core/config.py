from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int 
    DB_USER: str
    DB_PASS: str
    DB_NAME: str
    
    class Config:
        env_file = "*.env"
    


settings = Settings()
Settings.DB_URL = DB_URL = f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASS}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"



