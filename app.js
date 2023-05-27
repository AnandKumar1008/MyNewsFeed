const url="https://inshorts.deta.dev/news?";
//URL OF THE API
const select=document.querySelectorAll('.topics>span');
//selecting all span element of topics
const news=document.querySelectorAll('.news-detail>h6');//selecting all h6 elements under news-detals class element
const addNews=document.getElementById('add-news');//selecting id element of add-news
const destination=window.open("savedNewsPage.html");//
const save=document.getElementById('saveNews');//get element having name of saveNews
select.forEach((span)=>{
  //adding event listener to all span elements under topics class
  span.addEventListener('click',()=>{
    select.forEach((element)=>{
      element.style.backgroundColor="#FF6969";
      element.style.fontWeight=400;
    });
    atStart(span.textContent.toLowerCase());

    span.style.backgroundColor="#CD1818";
    span.style.fontWeight=500;
    addNews.innerHTML='Wait Until it loads....';
 
   });

});
function refresh(){
var icon = document.querySelectorAll('i');

icon.forEach((ion)=>{
  ion.addEventListener('click',()=>{
  ion.classList.toggle('fa-regular');
  ion.classList.toggle('fa-solid');
  // this will toggle the class of the icon
  let savedNews=JSON.parse(localStorage.getItem('savedNews'))||[];
  // saved to read later news which are liked 
  
   const parent=ion.parentElement;
   console.log(parent);
   // now going for the parent element of the icon which has been clikced
   const newsContent=parent.querySelector('p').textContent;
  
   // making paragraph element to store it in the local storage
 
   const author=parent.querySelector('h5');
   const anchor=parent.querySelector('a');
  //  console.log(parent)
  const href=anchor.getAttribute('href');
  const img=parent.querySelector("a>img");
  const src=img.getAttribute('src');
  // console.log(img);
  //  console.log(anchor);
   //for author oof the news 
   

  const category=parent.querySelector('h6');

  // for category of the new to which it belongs to
   const newsIndex=savedNews.findIndex(item=>item.content===newsContent);
   //index of the news to delete it when ever it is clicked
   
   if(newsIndex===-1){
    savedNews.push({id:parent.id,athr:author.textContent, categ:category.textContent,content:newsContent,imageUrl:src,link:href});
   }
   else{
    savedNews.splice(newsIndex,1);
   }
   
   localStorage.setItem('savedNews',JSON.stringify(savedNews));
  

  });
});

}

//------------------------------------------------------------
//----For the-Start of the Page-------------------------------------------------------------------------------------------------------------
function atStart(newsItem){
  // savedNews=[];
  addNews.innerHTML='Loading....';
  
  fetch(`${url}category=${newsItem}`)
  .then((response)=>response.json()).then((data)=>{
    var mainDiv=document.createElement('div');
     addNews.innerHTML='';
    
    console.log(data);
    //console.log(h6);
    for(let x in data.data){
      var content=document.createElement('div');
      const h6=document.createElement('h6');
      const anchor=document.createElement('a');
      anchor.setAttribute("href",data.data[x].readMoreUrl);
      const img=document.createElement('img');
      img.className="image";
      const url=data.data[x].imageUrl;
      // console.log(url);
      img.setAttribute("src",`${url}`);
      // console.log(img.src);
      anchor.append(img);

    h6.innerText=`CATEGORY:${data.category.toUpperCase()}`;
      content.classList.add("data");//class is given
      var div=document.createElement('div');
      div.classList.add("news-detail");
      var h5=document.createElement('h5');
      h5.innerText=`${data.data[x].author}`;
      div.append(h5);
      div.append(h6);
      const para=document.createElement('p');
      // console.log(h5,h6);
      para.innerText=data.data[x].content;
      //var node=document.createTextNode();
      //console.log(div);
      content.append(anchor);
      content.append(div);
      content.append(para);
      content.setAttribute('id',data.data[x].id);
     // var icon=document.createTextNode(`${<i class="fa-regular fa-heart"></i>}`);
      const icon=document.createElement('i');
      icon.className="fa-regular fa-heart";
      const savedNews=JSON.parse(localStorage.getItem('savedNews'))||[];
     
     
      savedNews.forEach((element)=>{
        //console.log(element.id,data.data[x].id);
        if(element.content===data.data[x].content){
          icon.className="fa-solid fa-heart";
        }
      })
      
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
   

  });
 
}
 atStart('all');

