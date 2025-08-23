import os
import sys

import aiohttp
from LxmlSoup import LxmlSoup
import aiohttp.client_exceptions
from sqlalchemy import select, LargeBinary
import asyncio
import requests
import time
from pydantic import BaseModel
import json
from pydantic import ValidationError

genre = ("Авангард",
"Гурман",
"Драма",
"Комедия",
"Повседневность",
"Приключения",
"Романтика",
"Сверхъестественное",
"Спорт",
"Тайна",
"Триллер",
"Ужасы",
"Фантастика",
"Фэнтези",
"Экшен",
"Этти"
)

success = 0
unsuc = 0
overal = 0
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

names_all = []
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from Models.Base import async_session_maker
import re
from Manga.crud import MangaDAO
from pydantic import TypeAdapter
import random

class MangaAdd(BaseModel):
    picture: bytes
    name: str
    alternative_name: str 
    description: str | None = ""
    tags: list[str] | None = []
    rating: float | None = 0.0
    chapter_size: int | None = 0
    volume_size: int | None = 0
    status: str | None = ""
    izdat: str | None = ""
    author: list | None = []
    time: str | None = ""

    rating_10: int | None = 0
    rating_9: int | None = 0
    rating_8: int | None = 0
    rating_7: int | None = 0
    rating_6: int | None = 0
    rating_5: int | None = 0
    rating_4: int | None = 0
    rating_3: int | None = 0
    rating_2: int | None = 0
    rating_1: int | None = 0
    

    model_config = {"extra": "forbid"}


async def pars(i):
    
    manga = {}
    genre_2 = []
    genre_3 = []
    genre_4 = []
    genre_5 = []
    async with aiohttp.ClientSession() as ses:
        
        #url getting
        url = f"https://shikimori.one/mangas/{i}"
        print(str(i) + " - id")

        async with ses.get(url) as response:
            #LxmlSoup creating
            res = await response.text()
            soup = LxmlSoup(res)

            #Names
            names = soup.find("h1")
            if names:
                names = names.text().split("/")
                if len(names) == 2:
                    manga["name"] = f"{i}-{names[1].strip().replace(" ", "-")}"
                    manga["alternative_name"] = names[0]
                else:
                    print("плохое имя")
            else:
                print("нет имени")

        
                #Status
            status = soup.find("span", class_="b-anime_status_tag released")
            if status:
                manga["status"] = status.get("data-text")
        
                if status.get("data-text") != "издано":
                    manga["volume_size"] = 0
                    manga["chapter_size"] = 0

            #description
            descriptions = soup.find_all("div", class_="b-entry-info")
            if descriptions:

                ext = descriptions[0].text().split(" ")


                #Главы и тома
                try:
                    a = ext.index("Тома:")
                except ValueError:
                    manga["volume_size"] = 0
                    a = None

                try:
                    b = ext.index("Главы:")
                except ValueError:
                    manga["chapter_size"] = 0
                    b = None


                if a:
                    manga["volume_size"] = ext[a + 1]
                if b:
                    manga["chapter_size"] = ext[b + 1]
                
            else:
                print("нет desc")
            #описание
            desc = soup.find("div", class_="b-text_with_paragraphs")
            if desc:
                manga["description"] = " ".join(desc.text().split(" "))
            else:
                manga["description"] = ""
                print("нет описания")

            #рейтинг
            rating = soup.find("div", class_="text-score")
            if rating:
                rating = rating.text().split(" ")[0]
                number, string = rating.split(".")
                mon = list(filter(str.isdigit, string))
                manga["rating"] = f"{number}.{"".join(mon)}"
            else:
                print("Нет рейтинга флоат")
                    

            #теги
            gen = soup.find_all("div", class_="line-container")
            if gen:
                for j in gen:
                    for k in j.find_all("span"):
                        genre_2.append(k.text())

                
                genre_2.pop(0)

                for j in genre_2:
                    if j == "Award Winning":
                        break
                    else:
                        genre_3.append(j)

                if status.get("data-text") == "издано":
                    genre_3.pop(0)

                for ind, j in enumerate(genre_3):
                    if j == "···":
                        break
                    else:
                        genre_4.append(j)

                russian_pattern = re.compile(r'[а-яА-Я]')
                
                for k in genre_4:
                    if russian_pattern.search(k) and k in genre:
                        genre_5.append(k)
                
                manga["tags"] = genre_5

            poster = soup.find("img")

            if poster:
                poster = poster.get("src")
                try:
                    with requests.get(poster, headers=headers)as ses:
                        if ses.status_code == 200:
                            manga["picture"] = ses.content
                        else:
                            print("плохая пикча")
                        
                except requests.exceptions.MissingSchema:
                    print("bad picture - 404")

            async with aiohttp.ClientSession() as ses:
                url = f"https://shikimori.one/mangas/{i}/resources"
                async with ses.get(url) as response:
                    res1 = await response.text()
                    soup1 = LxmlSoup(res1)
                    author = soup1.find_all("div", class_="c-column c-authors block_m")
                    if author:
                        if len(author) != 1:
                            author2 = author[1].find_all("a")
                        else:
                            author2 = author[0].find_all("a")
                        manga["author"] = []
                        for k in author2:
                            manga["author"].append(k.get("title"))
                    else:
                        print("нет автора")

            time = soup.find("span", class_="b-tooltipped dotted mobile")
            if time:
                if len(time.text()) == 0:
                    try:
                        idx = ext.index("Статус:") + 1
                    except ValueError:
                        print("нету")
                    times = []
                    for i in range(4):
                        times.append(ext[idx + i])
                    manga["time"] = " ".join(times)
                else:
                    time = time.text()
                

                    manga["time"] = time
                
            else:
                print("Нет времени")

            izdat = soup.find("div", class_="c-about")
            if izdat:
                izdat = izdat.find("div", class_="c-info-right")
                if izdat:
                    izdat = izdat.find_all("div", class_="block")

                    if izdat and len(izdat) == 2:
                        izdat = izdat[1].find("div", class_="block")
                        if izdat:
                            izdat = izdat.find("a")
                            if izdat:
                                izdat = izdat.text()
                                manga["izdat"] = izdat
                    elif izdat and len(izdat) == 3:
                        izdat = izdat[2].find("a")
                        manga["izdat"] = izdat.text()
                    else:
                        print("нет изд")
            else:
                print("нет издателя")
                
            rating_stats = soup.find("aside", class_="l-menu")
            if rating_stats:
                stats = rating_stats.find("div", class_="b-animes-menu")
                if stats:
                    stats = stats.find("div", class_="block")
                    if stats:
                        stats = stats.find_all("div")[1]
                        if stats:
                            stats = stats.get("data-stats")
                            stats = json.loads(stats)
                            if stats:
                                for l in stats:
                                    manga[f"rating_{l[0]}"] = l[1]
            print("------")
            return manga
            
            

async def validate():
    for i in range(1, 500000):
        try:
            manga_ = await pars(i)
            
            if manga_:
                manga_1 = MangaAdd(**manga_)
                print(manga_1.picture)
                print(f"Имя - {manga_1.name}")
                print(f"Русское имя - {manga_1.alternative_name}")
                print(f"Жанры - {manga_1.tags}")
                print(f"Рейтинг - {manga_1.rating}")
                print(f"Кол-во глав - {manga_1.chapter_size}")
                print(f"Кол-во томов - {manga_1.volume_size}")
                print(f"Статус - {manga_1.status}")
                print(f"Издатель - {manga_1.izdat}")
                print(f"Автор - {manga_1.author}")
                print(f"Время - {manga_1.time}")
                print(f"рейтинг 10 - {manga_1.rating_10}")
                print(f"рейтинг 9 - {manga_1.rating_9}")
                print(f"рейтинг 8 - {manga_1.rating_8}")
                print(f"рейтинг 7 - {manga_1.rating_7}")
                print(f"рейтинг 6 - {manga_1.rating_6}")
                print(f"рейтинг 5 - {manga_1.rating_5}")
                print(f"рейтинг 4 - {manga_1.rating_4}")
                print(f"рейтинг 3 - {manga_1.rating_3}")
                print(f"рейтинг 2 - {manga_1.rating_2}")
                print(f"рейтинг 1 - {manga_1.rating_1}")
                global success
                global overal
                global unsuc
                success += 1
                overal += 1
                print("------")
                await MangaDAO.insert_data(**manga_1.__dict__)
                time.sleep(random.uniform(1.0, 1.5))
            else:
                unsuc += 1
                overal += 1
        except Exception as e:
            overal += 1
            unsuc += 1
            print(f"Валидация - {e}")
            pass
        


try:
    asyncio.run(validate())
except KeyboardInterrupt:
    print(f"Success - {success}")
    print(f"Failture - {unsuc}")
    print(f"Success percentage - {success / overal * 100}%")
            
print(f"Success - {success}")
print(f"Failture - {unsuc}")
print(f"Success percentage - {success / overal * 100}%")
