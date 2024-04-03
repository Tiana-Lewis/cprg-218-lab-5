document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const cardsContainer = document.getElementById("cards-container");

  generateBtn.addEventListener("click", () => {
    fetchNews();
  });

  async function fetchNews() {
    try {
      const response = await fetch("https://api.thenewsapi.com/v1/news/top?api_token=BPlXi1yJWmqoD4hh6Q7lRTJTEHUZe27TguPKge17&locale=us&limit=3");
      const data = await response.json();
      displayNews(data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function displayNews(news) {
    cardsContainer.innerHTML = "";
    news.forEach(article => {
      const card = createCard(article);
      cardsContainer.appendChild(card);
    });
  }

  function createCard(article) {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const image = document.createElement("img");
    image.src = article.image_url;
    image.alt = article.title;

    const source = document.createElement("p");
    source.textContent = `Source: ${article.source}`;

    const publishedAt = document.createElement("p");
    publishedAt.textContent = `Published at: ${new Date(article.published_at).toLocaleString()}`;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(image);
    card.appendChild(source);
    card.appendChild(publishedAt);

    return card;
  }
});