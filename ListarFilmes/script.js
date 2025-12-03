const API_KEY = 'c04fae995a44eccfd138d5c781187e17';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function fetchMovies(searchTerm) {
    // Monta a URL de busca com a chave e o termo do usuário
    const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&language=pt-BR`;

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<p class="placeholder-text">Buscando filmes...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Lida com erros de status HTTP
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Erro na busca:', error);
            resultsContainer.innerHTML = `<p class="placeholder-text" style="color: #ff6961;">❌ Erro ao carregar dados.</p>`;
        });
}

function displayResults(movies) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Limpa resultados anteriores

    if (movies.length === 0) {
        resultsContainer.innerHTML = '<p class="placeholder-text">Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Cria a URL da imagem. Se não houver poster, usa um placeholder.
        const posterPath = movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=Sem+Poster';
        
        const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
        const synopsis = movie.overview ? movie.overview.substring(0, 150) + '...' : 'Sem sinopse disponível.';

        // Cria o HTML do cartão
        movieCard.innerHTML = `
            <img src="${posterPath}" alt="Poster de ${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Ano:</strong> ${year}</p>
            <p><strong>Popularidade:</strong> ${movie.popularity.toFixed(1)}</p>
            <p><strong>Sinopse:</strong> ${synopsis}</p>
        `;
        
        resultsContainer.appendChild(movieCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita o envio padrão do formulário
        const searchTerm = input.value.trim();

        if (searchTerm) {
            fetchMovies(searchTerm);
        } else {
             document.getElementById('results-container').innerHTML = '<p class="placeholder-text">Digite um termo de busca.</p>';
        }
    });
});