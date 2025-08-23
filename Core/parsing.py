import aiohttp
from LxmlSoup import LxmlSoup
# from Core.Models.manga import Mangas
from sqlalchemy import select
import asyncio
import time
success = 0
unsuc = 0
overal = 1
genre = []
manga = {}
genir = []
genr = []
g = []
names_all = []
from Core.Models.Base import async_session_maker


async def pars():
    
    print(names_all)
    
    async with aiohttp.ClientSession() as ses:
        for i in res:
            try:
                url = f"https://shikimori.one/mangas/{i}"
                print(str(i) + " - id")
                async with ses.get(url) as response:
                    res = await response.text()
                    soup = LxmlSoup(res)
                    names = soup.find("h1")
                    
                    if names:
                        names = names.text().split("/")
                        if len(names) == 2:
                            manga["name"] = f"{i}-{names[1].strip().replace(" ", "-")}"
                    
                    descriptions = soup.find_all("div", class_="b-entry-info")
                    if descriptions:
                        ext = descriptions[0].text().split(" ")
                        
                        status = soup.find("span", class_="b-anime_status_tag released")
                        if status:
                            manga["status"] = status.get("data-text")
                        if status.get("data-text") != "издано":
                            manga["volume_size"] = 0
                            manga["chapter_size"] = 0
                        else:
                            try:
                                a = ext.index("Тома:")
                            except ValueError:
                                manga["volume_size"] = 0
                            try:
                                b = ext.index("Главы:")
                            except ValueError:
                                manga["chapter_size"] = 0
                            manga["volume_size"] = ext[a + 1]
                            manga["chapter_size"] = ext[b + 1]

                    desc = soup.find("div", class_="b-text_with_paragraphs")
                    if desc:
                        manga["description"] = " ".join(desc.text().split(" "))

                    rating = soup.find("div", class_="text-score")
                    if rating:
                            try:
                                float(rating.text().split(" ")[0][:4])
                                manga["rating"] = rating.text().split(" ")[0][:4]
                            except:
                                manga["rating"] = rating.text().split(" ")[0][:3]
                                
                            
                    
                    gen = soup.find_all("div", class_="line-container")
                    if gen:
                        for j in gen:
                            for k in j.find_all("span"):
                                genir.append(k.text())

                        
                        genir.pop(0)

                        for j in genir:
                            if j == "Award Winning":
                                break
                            else:
                                genr.append(j)

                        if status.get("data-text") == "издано":
                            genr.pop(0)

                        for ind, j in enumerate(genr):
                            if j == "···":
                                break
                            else:
                                g.append(j)

                        manga["tags"] = "*".join(g)

                    
                    # author = soup.find_all("div", class_="name")
                    # if author:
                    #     for j in author:
                    #         print(j.text() + "-" * 50)

                    
                    
                    if manga:
                        async with ses.post("http://127.0.0.1:8000/manga/add", json=manga) as resp:
                            print(str(resp.status) + " - code")
                            if resp.status == 200: 
                                global success
                                success += 1
                                global overal 
                                overal += 1
                            else:
                                global unsuc
                                unsuc += 1
                                overal += 1
                        time.sleep(1)
                            
                    else:
                        res = soup.find("p", class_="error-404")
                        if res:
                            print(res.text() + " - code")
                            unsuc += 1
                            overal += 1
                        
                    print("------")
                    manga.clear()
                    genre.clear()
                    genr.clear()
                    genir.clear()
                    g.clear()
            except:
                print(f"Success: {success}")
                print(f"Failture: {unsuc}")
                print(f"Overal: {overal}")
                print(f"Success percentage: {success / overal * 100}%")
                pass
                
    
        

            


asyncio.run(pars())
