const API_KEY = "";

const articlesContainer = document.getElementById("articles-container");
const loadingMessage = document.getElementById("loading-message");

const sortRadios = document.querySelectorAll(".sort-radio");
const timeRadios = document.querySelectorAll(".time-radio");

function getSelectedSort() {
  return document.querySelector('input[name="sort"]:checked').value;
}

function getSelectedTime() {
  return document.querySelector('input[name="time"]:checked').value;
}

function buildApiUrl() {
  const sort = getSelectedSort();
  const time = getSelectedTime();

  return `https://api.nytimes.com/svc/mostpopular/v2/${sort}/${time}.json?api-key=${API_KEY}`;
}

async function getArticles() {
  articlesContainer.innerHTML = "";
  loadingMessage.textContent = "Loading articles...";

  try {
    const response = await fetch(buildApiUrl());
    const data = await response.json();

    console.log(data.results[0]);

    displayArticles(data.results);
  } catch (error) {
    loadingMessage.textContent = "Could not load articles.";
    console.log(error);
  }
}

function getArticleImage(article) {
  return article.media[0]["media-metadata"][0].url;
}

function displayArticles(articles) {
  articlesContainer.innerHTML = "";
  loadingMessage.textContent = "";

  let count = 0;

  for (let i = 0; i < articles.length && count < 10; i++) {
    try {
      const article = articles[i];

      const title = article.title;
      const abstract = article.abstract;
      const date = article.published_date;
      const url = article.url;
      const imageUrl = getArticleImage(article);

      const articleCard = document.createElement("article");
      articleCard.className = "article-card";

      articleCard.innerHTML = `
        <div class="article-header">
          <h2 class="article-title">
            <a class="article-link" href="${url}" target="_blank">
              ${count + 1}) ${title}
            </a>
          </h2>
          <span class="article-date">${date}</span>
        </div>

        <div class="article-body">
          <img class="article-image" src="${imageUrl}" alt="${title}" />
          <p class="article-abstract">${abstract}</p>
        </div>
      `;

      articlesContainer.appendChild(articleCard);
      count++;
    } catch (error) {
      continue;
    }
  }
}

sortRadios.forEach((radio) => {
  radio.addEventListener("change", getArticles);
});

timeRadios.forEach((radio) => {
  radio.addEventListener("change", getArticles);
});

getArticles();