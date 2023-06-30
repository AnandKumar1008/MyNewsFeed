//const body=document.getElementById('saved-body');
const save = document.getElementById("saveNews");
window.addEventListener("load", makingSavedNews);
// console.log(icon);
const counter = document.getElementById("count");
const searchItem = document.getElementById("searchItem");
searchItem.addEventListener("input", () => {
  // let newses=document.getElementById('savedNews');
  // newses='';
  const value = searchItem.value;
  console.log(value);
  const data = JSON.parse(localStorage.getItem("savedNews"));
  console.log(data);
  const newArray = [];
  data.forEach((item) => {
    // console.log(item);
    if (item.categ.toLowerCase().includes(value)) {
      newArray.push(item);
    }
  });
  console.log(newArray);
  // makingSavedNews(newArray);
  render(newArray);
});

function makingSavedNews() {
  save.innerHTML = "";
  const savedNews = JSON.parse(localStorage.getItem("savedNews"));

  const container = document.createElement("div");
  const size = savedNews.length;
  counter.innerHTML = `${size}`;
  savedNews.forEach((element) => {
    const div = document.createElement("div");
    // div.className="data";
    div.classList.add("data");
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("src", element.imageUrl);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", element.link);
    anchor.append(image);
    div.append(anchor);

    const detail = document.createElement("div");
    detail.className = "news-detail";
    const h5 = document.createElement("h5");
    h5.innerText = element.athr;
    const h6 = document.createElement("h6");
    h6.innerText = element.categ;
    detail.append(h5);
    detail.append(h6);
    div.append(detail);
    //console.log(element.content);
    const para = document.createElement("p");
    para.innerText = element.content;
    //let node=document.createTextNode(element.content);
    div.append(para);
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-heart";
    div.append(icon);

    container.append(div);
  });
  container.classList.add("news-container");
  save.append(container);
  if (savedNews.length === 0) {
    save.innerText = "Nothing is saved😊";
    save.style.textAlign = "center";
  }
  refresh();
  // console.log(save);
}

function refresh() {
  var icon = document.querySelectorAll("i");
  // icon.addEventListener('click', function () {

  //   icon.classList.toggle('fa-regular');
  //   icon.classList.toggle('fa-solid');
  // });
  icon.forEach((ion) => {
    ion.addEventListener("click", () => {
      ion.classList.toggle("fa-regular");
      ion.classList.toggle("fa-solid");
      let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

      const parent = ion.parentElement;
      //console.log(parent.innerHTML);
      const newsContent = parent.querySelector("p").textContent;
      // console.log(newsContent);
      //  console.log(innerText);
      console.log(newsContent, savedNews);
      const author = parent.querySelector("h5");
      console.log(author.textContent);
      const category = parent.querySelector("h6");
      const newsIndex = savedNews.findIndex(
        (item) => item.content === newsContent
      );

      if (newsIndex === -1) {
        savedNews.push({
          athr: author.textContent,
          categ: category.textContent,
          content: newsContent,
        });
      } else {
        savedNews.splice(newsIndex, 1);
      }
      //savedNews.splice(0,5);
      localStorage.setItem("savedNews", JSON.stringify(savedNews));
      makingSavedNews();
    });
  });
}
//***************SEARCH ITEM********************************************** */
const render = (savedNews) => {
  save.innerHTML = "";
  const container = document.createElement("div");
  const size = savedNews.length;
  counter.innerHTML = `${size}`;
  savedNews.forEach((element) => {
    const div = document.createElement("div");
    // div.className="data";
    div.classList.add("data");
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("src", element.imageUrl);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", element.link);
    anchor.append(image);
    div.append(anchor);

    const detail = document.createElement("div");
    detail.className = "news-detail";
    const h5 = document.createElement("h5");
    h5.innerText = element.athr;
    const h6 = document.createElement("h6");
    h6.innerText = element.categ;
    detail.append(h5);
    detail.append(h6);
    div.append(detail);
    //console.log(element.content);
    const para = document.createElement("p");
    para.innerText = element.content;
    //let node=document.createTextNode(element.content);
    div.append(para);
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-heart";
    div.append(icon);

    container.append(div);
  });
  container.classList.add("news-container");
  save.append(container);
  if (savedNews.length === 0) {
    save.innerText = "Nothing is saved😊";
    save.style.textAlign = "center";
  }
  refresh();
};
