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
//URL OF THE API
const Img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl0XGcgZivIDeGqLE0_ZSBARUIdHLJJ9NHQIYPy7zpUt1bbtU_5YpcZNHzinMXbtKVQMI&usqp=CAU";
const select = document.querySelectorAll(".topics>span");
//selecting all span element of topics
const news = document.querySelectorAll(".news-detail>h6"); //selecting all h6 elements under news-detals class element
const addNews = document.getElementById("add-news"); //selecting id element of add-news
const destination = window.open("savedNewsPage.html"); //
const save = document.getElementById("saveNews"); //get element having name of saveNews
select.forEach((span) => {
  //adding event listener to all span elements under topics class
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
      // this will toggle the class of the icon
      let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
      // saved to read later news which are liked

      const parent = ion.parentElement;
      console.log(parent);
      // now going for the parent element of the icon which has been clikced
      const newsContent = parent.querySelector("p").textContent;
      const publishedAt = parent.getAttribute("id");
      console.log(publishedAt);

      // making paragraph element to store it in the local storage

      const author = parent.querySelector("h5");
      const anchor = parent.querySelector("a");
      //  console.log(parent)
      const href = anchor.getAttribute("href");
      const img = parent.querySelector("a>img");
      const src = img.getAttribute("src");
      // console.log(img);
      //  console.log(anchor);
      //for author oof the news

      const category = parent.querySelector("h6");

      // for category of the new to which it belongs to

      const newsIndex = savedNews.findIndex((item) => item.link === href);

      //index of the news to delete it when ever it is clicked

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
  // console.log(data);
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
    // console.log(url);
    // console.log(url);
    img.setAttribute("src", `${url}`);
    // console.log(img.src);
    anchor.append(img);

    h6.innerText = `CATEGORY:${category.toUpperCase()}`;
    content.classList.add("data"); //class is given
    var div = document.createElement("div");
    div.classList.add("news-detail");
    var h5 = document.createElement("h5");
    h5.innerText = `${data[x].author}`;
    div.append(h5);
    div.append(h6);
    const para = document.createElement("p");
    // console.log(h5,h6);
    para.innerText = data[x].content;
    // para.setAttribute("id", data[x].publishedAt);
    //var node=document.createTextNode();
    //console.log(div);
    content.append(anchor);
    content.append(div);
    content.append(para);
    // content.setAttribute("id", data[x].publishedAt);
    // var icon=document.createTextNode(`${<i class="fa-regular fa-heart"></i>}`);
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-heart";
    const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

    savedNews.forEach((element) => {
      //console.log(element.id,data.data[x].id);
      if (element.link === data[x].url) {
        icon.className = "fa-solid fa-heart";
      }
    });

    content.append(icon);
    mainDiv.append(content);
    // savedNews.splice(0,4);
    // savedNews.splice(0,100);
  }
  mainDiv.classList.add("news-container");
  // const addNews=document.getElementById("add-news");

  // savedNews=[];
  addNews.append(mainDiv);

  refresh();
};
//****************************************************************************************************** */

const API_KEY = "60365b29851d46a58ec24f1c75e1f275";
// const category=''
const url2 = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;

const getNews = async (category) => {
  let data = Allnews[category];
  Organise(data, category);
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiey=${API_KEY}`
    );
    const obj = await response.json();
    data = obj.articles;
    if (data === undefined) {
      throw new Error("This is an error message.");
    }
    Organise(data, category);
  } catch (error) {
    // Organise(data, category);
    console.log(error);
  }
  // console.log("here");
};

getNews("general");
//******************************************************************************************************************************* */
