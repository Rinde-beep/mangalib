from fastapi import FastAPI
from Catalog.catalog_views import router as catalog_router
from Manga.manga_views import router as manga_router
from User.user_views import router as user_router
from Review.review_views import router as review_router
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=['*']
)
app.include_router(catalog_router)
app.include_router(manga_router)
app.include_router(user_router)
app.include_router(review_router)

@app.get("/api/", tags=["Main"])
def main_page():
    pass


