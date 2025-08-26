from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from Core.config import settings


engine = create_async_engine(
    settings.DB_URL,
    echo=True,
    pool_size=5,
    max_overflow=10
    )

async_session_maker = async_sessionmaker(engine)

class Base(DeclarativeBase):
    

    def __repr__(self):
        return f"{self.__class__.__name__}#{self.id}"
        
