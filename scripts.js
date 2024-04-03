const generateButton = document.getElementById("generate-btn");
const cardsContainer = document.getElementById("cards-container");

generateButton.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "https://api.thenewsapi.com/v1/news/top?api_token=BPlXi1yJWmqoD4hh6Q7lRTJTEHUZe27TguPKge17&locale=us&limit=3"
    );
    const data = await response.json();
    cardsContainer.innerHTML = ""; // Clear previous cards
    data.data.forEach((item) => {
      const card = createCard(item);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
});

function createCard(newsItem) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = newsItem.title;

  const description = document.createElement("p");
  description.textContent = newsItem.description;

  const source = document.createElement("p");
  source.textContent = "Source: " + newsItem.source;

  const image = document.createElement("img");
  image.src = newsItem.image_url;
  image.alt = newsItem.title;

  const link = document.createElement("a");
  link.textContent = "Read More";
  link.href = newsItem.url;
  link.target = "_blank";

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(description);
  card.appendChild(source);
  card.appendChild(link);

  return card;
}
