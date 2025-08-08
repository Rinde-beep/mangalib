from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    login = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)
    lvl = Column(Integer, nullable=False)
    bookmarks = Column(String, nullable=False)
