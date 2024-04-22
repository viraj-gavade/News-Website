const url = "https://newsapi.org/v2/everything?q=";
const apiKey = "7b993c66c7a44882b08579799d10bc6c";
const searchtext = document.getElementById("search-text")
const searchbutton=document.getElementById("search-button")
const headline=document.getElementById("headline")




const fetchNews = async (query) => {
  headline.innerHTML=`<h1 class="headline">NEWS / ${query}</h1>`
  let container = document.getElementById("container");
  container.innerHTML = `<h2>Fetching News Related ${query}...</h2>`; // Clear previous content
  try {
    let response = await fetch(`${url}${query}&apiKey=${apiKey}`);
    let data = await response.json();
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news...", error);
  }
};
searchbutton.addEventListener('click',()=>{
  const searchtxt = searchtext.value.trim()
   fetchNews(searchtxt) 
})

const bindData = (articles) => {
  let container = document.getElementById("container");
  container.innerHTML = ""; // Clear previous content
  
  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
      timeZone: "Asia/Jakarta",
    });

    let div = document.createElement("div");
    div.innerHTML = ` 
      <div class="card">
        <img src=${article.urlToImage} alt="Unable to Load to image" class="card-img" loading="lazy">
        <p class="card-text">
          <h2>${article.title}</h2>
          <h5>${article.source.name} : ${date}</h5>
          <p>${article.description}</p>
        </p>
      </div>`;

    div.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    container.appendChild(div);
  });
};

let currentSelectedNav = null;

function Navitemactive(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add("active");
}
window.onload(fetchNews('top'))
