const API_KEY = "";

const articlesContainer = document.getElementById("articles-container");
const loadingMessage = document.getElementById("loading-message");

const sortViewed = document.getElementById("sort-viewed");
const sortShared = document.getElementById("sort-shared");
const sortEmailed = document.getElementById("sort-emailed");

const timeDay = document.getElementById("time-day");
const timeWeek = document.getElementById("time-week");
const timeMonth = document.getElementById("time-month");

function getSelectedSort() {
  if (sortViewed.checked) {
    return sortViewed.value;
  }

  if (sortShared.checked) {
    return sortShared.value;
  }

  if (sortEmailed.checked) {
    return sortEmailed.value;
  }
}

function getSelectedTime() {
  if (timeDay.checked) {
    return timeDay.value;
  }

  if (timeWeek.checked) {
    return timeWeek.value;
  }

  if (timeMonth.checked) {
    return timeMonth.value;
  }
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

    if (!response.ok) {
      throw new Error("Could not fetch articles");
    }

    const data = await response.json();

    displayArticles(data.results);
  } catch (error) {
    loadingMessage.textContent = "Could not load articles.";
    console.log(error);
  }
}

function getArticleImage(article) {
  if (
    article.media &&
    article.media.length > 0 &&
    article.media[0]["media-metadata"] &&
    article.media[0]["media-metadata"].length > 0
  ) {
    const images = article.media[0]["media-metadata"];
    return images[images.length - 1].url;
  }

  return "https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png";
}

function displayArticles(articles) {
  articlesContainer.innerHTML = "";
  loadingMessage.textContent = "";

  let count = 0;

  for (let i = 0; i < articles.length && count < 10; i++) {
    const article = articles[i];

    const title = article.title;
    const abstract = article.abstract;
    const date = article.published_date;
    const url = article.url;
    const imageUrl = getArticleImage(article);

    const articleCard = document.createElement("article");
    articleCard.className = "article-card";
    articleCard.id = `article-card-${count + 1}`;

    const articleHeader = document.createElement("div");
    articleHeader.className = "article-header";
    articleHeader.id = `article-header-${count + 1}`;

    const articleTitle = document.createElement("h2");
    articleTitle.className = "article-title";
    articleTitle.id = `article-title-${count + 1}`;

    const articleLink = document.createElement("a");
    articleLink.className = "article-link";
    articleLink.id = `article-link-${count + 1}`;
    articleLink.href = url;
    articleLink.target = "_blank";
    articleLink.rel = "noopener noreferrer";
    articleLink.textContent = `${count + 1}) ${title}`;

    const articleDate = document.createElement("span");
    articleDate.className = "article-date";
    articleDate.id = `article-date-${count + 1}`;
    articleDate.textContent = date;

    const articleBody = document.createElement("div");
    articleBody.className = "article-body";
    articleBody.id = `article-body-${count + 1}`;

    const articleImage = document.createElement("img");
    articleImage.className = "article-image";
    articleImage.id = `article-image-${count + 1}`;
    articleImage.src = imageUrl;
    articleImage.alt = title;

    const articleAbstract = document.createElement("p");
    articleAbstract.className = "article-abstract";
    articleAbstract.id = `article-abstract-${count + 1}`;
    articleAbstract.textContent = abstract;

    articleTitle.appendChild(articleLink);

    articleHeader.appendChild(articleTitle);
    articleHeader.appendChild(articleDate);

    articleBody.appendChild(articleImage);
    articleBody.appendChild(articleAbstract);

    articleCard.appendChild(articleHeader);
    articleCard.appendChild(articleBody);

    articlesContainer.appendChild(articleCard);

    count++;
  }
}

sortViewed.addEventListener("change", getArticles);
sortShared.addEventListener("change", getArticles);
sortEmailed.addEventListener("change", getArticles);

timeDay.addEventListener("change", getArticles);
timeWeek.addEventListener("change", getArticles);
timeMonth.addEventListener("change", getArticles);

getArticles();