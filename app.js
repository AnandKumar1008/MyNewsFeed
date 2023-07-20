import {
  general,
  business,
  entertainment,
  health,
  science,
  sports,
  technology,
} from "./module.js";
const Allnews = {
  business,
  entertainment,
  general,
  health,
  science,
  sports,
  technology,
};

const url = "https://inshorts.deta.dev/news?";
const newUrlKey = "60365b29851d46a58ec24f1c75e1f275";

const Img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl0XGcgZivIDeGqLE0_ZSBARUIdHLJJ9NHQIYPy7zpUt1bbtU_5YpcZNHzinMXbtKVQMI&usqp=CAU";
const select = document.querySelectorAll(".topics>span");
//selecting all span element of topics
const news = document.querySelectorAll(".news-detail>h6"); //selecting all h6 elements under news-detals class element
const addNews = document.getElementById("add-news"); //selecting id element of add-news
const destination = window.open("savedNewsPage.html"); //
const save = document.getElementById("saveNews"); //get element having name of saveNews
select.forEach((span) => {
  span.addEventListener("click", () => {
    select.forEach((element) => {
      element.style.backgroundColor = "#FF6969";
      element.style.fontWeight = 400;
    });

    span.style.backgroundColor = "#CD1818";
    span.style.fontWeight = 500;
    addNews.innerHTML = "Wait Until it loads....";
    getNews(span.textContent.toLowerCase());
  });
});
// ****************************************************************************************************************************************************************
function refresh() {
  var icon = document.querySelectorAll("i");

  icon.forEach((ion) => {
    ion.addEventListener("click", () => {
      ion.classList.toggle("fa-regular");
      ion.classList.toggle("fa-solid");
      let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

      const parent = ion.parentElement;
      console.log(parent);
      const newsContent = parent.querySelector("p").textContent;

      const publishedAt = parent.getAttribute("id");

      const author = parent.querySelector("h5");
      const anchor = parent.querySelector("a");

      const href = anchor.getAttribute("href");
      const img = parent.querySelector("a>img");
      const src = img.getAttribute("src");

      const category = parent.querySelector("h6");

      const newsIndex = savedNews.findIndex((item) => item.link === href);

      if (newsIndex === -1) {
        savedNews.push({
          athr: author.textContent,
          categ: category.textContent,
          content: newsContent,
          imageUrl: src,
          link: href,
        });
      } else {
        savedNews.splice(newsIndex, 1);
      }

      localStorage.setItem("savedNews", JSON.stringify(savedNews));
    });
  });
}
// *******************************************************************************************************************************---

const Organise = (data, category) => {
  var mainDiv = document.createElement("div");
  addNews.innerHTML = "";

  for (let x in data) {
    var content = document.createElement("div");
    const h6 = document.createElement("h6");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", data[x].url);
    const img = document.createElement("img");
    img.className = "image";
    const url = data[x].urlToImage || Img;

    img.setAttribute("src", `${url}`);
    anchor.append(img);

    h6.innerText = `CATEGORY:${category.toUpperCase()}`;
    content.classList.add("data");
    var div = document.createElement("div");
    div.classList.add("news-detail");
    var h5 = document.createElement("h5");
    h5.innerText = `${data[x].author || "Author"}`;
    div.append(h5);
    div.append(h6);
    const para = document.createElement("p");

    const readMore = document.createElement("a");
    readMore.classList.add("readMore");
    readMore.innerHTML = `Readmore`;
    readMore.setAttribute("href", data[x].url);
    para.innerText = data[x]?.content?.slice(0, -14) || "" + " ...";

    para.appendChild(readMore);
    content.append(anchor);
    content.append(div);
    content.append(para);
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-heart";
    const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

    savedNews.forEach((element) => {
      if (element.link === data[x].url) {
        icon.className = "fa-solid fa-heart";
      }
    });

    content.append(icon);
    mainDiv.append(content);
  }
  mainDiv.classList.add("news-container");

  addNews.append(mainDiv);

  refresh();
};
//****************************************************************************************************** */

const API_KEY = "60365b29851d46a58ec24f1c75e1f275";

const url2 = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;

const getNews = async (category) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
    );
    const obj = await response.json();
    const item = obj.articles;
    if (item === undefined) {
      throw new Error("This is an error message.");
    }
    Organise(item, category);
  } catch (error) {
    const data = Allnews[category];
    setTimeout(() => {
      Organise(data, category);
    }, 1000);
    console.log(error);
  }
};

getNews("general");

//******************************************************************************************************************************* */
