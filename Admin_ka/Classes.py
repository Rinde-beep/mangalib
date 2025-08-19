from sqladmin import Admin, ModelView
from Core.Models.manga import Mangas
from Core.Models.user import Users
from Core.Models.review import Reviews


class UserAdmin(ModelView, model=Users):
    column_list = [Users.id, Users.email]
    can_delete = False
    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"


class MangaAdmin(ModelView, model=Mangas):
    column_list = [Mangas.id, Mangas.name, Mangas.chapter_size, Mangas.rating]
    name = "Manga"
    name_plural = "Mangas"


class ReviewAdmin(ModelView, model=Reviews):
    column_list = []


