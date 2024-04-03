const countrySelect = document.getElementById('countrySelect');
const getNewsBtn = document.getElementById('getNewsBtn');
const newsContainer = document.getElementById('newsContainer');

getNewsBtn.addEventListener('click', () => {
  const country = countrySelect.value;
  const apiKey = 'd727499d05724f33be4f5e5017ca7fe2';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayNews(data.articles.slice(0, 3))) // Display only the first three articles
    .catch(error => console.log('Error fetching news:', error));
});

function displayNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description;

    const source = document.createElement('p');
    source.textContent = `Source: ${article.source.name}`;

    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = 'Read More';
    link.target = '_blank';

    const image = document.createElement('img');
    image.src = article.urlToImage;
    image.alt = article.title;

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(description);
    card.appendChild(source);
    card.appendChild(link);

    newsContainer.appendChild(card);
  });
}