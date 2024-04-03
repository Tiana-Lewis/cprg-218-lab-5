async function fetchNews(domains) {
  try {
      const url = `https://api.currentsapi.services/v1/latest-news?domain=${domains}`;
      const response = await fetch(url, {
          headers: {
              'Authorization': 'uD4BN-18PX4I9w4fLicIALp-8JpCTCgsChCA7auy4bJzM_ww'
          }
      });
      const data = await response.json();
      return data.news;
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}

function createNewsCard(article) {
  const card = document.createElement('div');
  card.classList.add('news-card');
  card.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
  `;
  return card;
}

async function updateNews(domains) {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = ''; // Clear previous news cards

  const articles = await fetchNews(domains);
  // Shuffle the articles array to get different news each time
  shuffleArray(articles);
  // Display the first three articles
  articles.slice(0, 3).forEach(article => {
      const card = createNewsCard(article);
      newsContainer.appendChild(card);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

document.getElementById('generateButton').addEventListener('click', function() {
  const selectedDomains = document.getElementById('locationSelector').value;
  updateNews(selectedDomains);
});

// Initial update when the page loads
updateNews(document.getElementById('locationSelector').value);
