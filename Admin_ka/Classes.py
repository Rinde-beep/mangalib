from sqladmin import Admin, ModelView
from Core.Models.manga import Mangas
from Core.Models.user import Users
from Core.Models.review import Reviews
from Core.Models.comment import Comments
import io

class UserAdmin(ModelView, model=Users):
    column_list = [Users.id, Users.login, Users.email, Users.bookmarks, Users.lvl]
    can_delete = False
    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"


class MangaAdmin(ModelView, model=Mangas):
    column_list = [Mangas.id,
                Mangas.alternative_name,
                Mangas.tags,
                Mangas.rating,
                Mangas.chapter_size,
                Mangas.volume_size,
                Mangas.status,
                Mangas.time,
                Mangas.author,
                Mangas.izdat, Mangas.review, Mangas.comment, Mangas.list]
    name = "Manga"
    name_plural = "Mangas"

class ReviewAdmin(ModelView, model=Reviews):
    column_list = [Reviews.id, Reviews.manga, Reviews.user ,Reviews.rating, Reviews.description]
    name = "Review"
    name_plural = "Reviews"

class CommentAdmin(ModelView, model=Comments):
    column_list = [Comments.id, Comments.manga, Comments.user, Comments.description]
    name = "Comment"
    name_plural = "Comments"




