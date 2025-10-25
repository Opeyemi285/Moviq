const movie = JSON.parse(sessionStorage.getItem('movies'));

const title = document.querySelector('title')

const all = document.querySelector(".all-movies")
try {
    const movieId = movie.id
} catch (TypeError) {
    all.innerHTML = "<p>No category selected. Please go back and pick one.</p>"
}

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original';
const pages = 1;

async function getMovies() {
    if (movie.id == "popular") {
        title.innerHTML+= " - popular"
    for (i = pages; i < 20; i++) {
            const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${i}`;

            const response = await fetch (url)
            const data = await response.json()
            if (data.results.length > 0) {
                    all.innerHTML += data.results
                        .map(movie => `
                            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}">
                                <div class="movie" id="${movie.id}">
                                    <img class="movie-cover" 
                                        src="${image_url + movie.poster_path}" 
                                        alt="${movie.title || movie.name}" 
                                        loading="lazy">
                                    <p class="movie-title" style="font-size: 14px;">
                                        ${movie.title || movie.name}
                                    </p>
                                    <p class="movie-ratings" style="font-size: 12px; color: gold;">
                                        <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(1)} 
                                        <span style="font-size: 10px;">/10</span>
                                    </p>
                                </div>
                            </a>
                        `)
                        .join('');
                document.querySelectorAll('.movie-link').forEach(link => {
                    link.addEventListener('click', function () {
                        const movieData = {
                        id: this.dataset.id,
                        title: this.dataset.title,
                        overview: this.dataset.overview,
                        rating: this.dataset.rating,
                        release_date: this.dataset.date
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });

            }
        }
    }
    else if (movie.id == "trending") {
        title.innerHTML+= " - trending"
        for (i = pages; i < 20; i++) {
            const url = `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&page=${i}`;

            const response = await fetch (url)
            const data = await response.json()
            if (data.results.length > 0) {
                    all.innerHTML += data.results
                        .map(movie => `
                            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}">
                                <div class="movie" id="${movie.id}">
                                    <img class="movie-cover" 
                                        src="${image_url + movie.poster_path}" 
                                        alt="${movie.title || movie.name}" 
                                        loading="lazy">
                                    <p class="movie-title" style="font-size: 14px;">
                                        ${movie.title || movie.name}
                                    </p>
                                    <p class="movie-ratings" style="font-size: 12px; color: gold;">
                                        <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(1)} 
                                        <span style="font-size: 10px;">/10</span>
                                    </p>
                                </div>
                            </a>
                        `)
                        .join('');
                document.querySelectorAll('.movie-link').forEach(link => {
                    link.addEventListener('click', function () {
                        const movieData = {
                        id: this.dataset.id,
                        title: this.dataset.title,
                        overview: this.dataset.overview,
                        rating: this.dataset.rating,
                        release_date: this.dataset.date
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });

            }
        }
    }
    else if (movie.id == "topRated") {
        title.innerHTML+= " - Top Rated"
        for (i = pages; i < 20; i++) {
            const url = `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${i}`;

            const response = await fetch (url)
            const data = await response.json()
            if (data.results.length > 0) {
                    all.innerHTML += data.results
                        .map(movie => `
                            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}">
                                <div class="movie" id="${movie.id}">
                                    <img class="movie-cover" 
                                        src="${image_url + movie.poster_path}" 
                                        alt="${movie.title || movie.name}" 
                                        loading="lazy">
                                    <p class="movie-title" style="font-size: 14px;">
                                        ${movie.title || movie.name}
                                    </p>
                                    <p class="movie-ratings" style="font-size: 12px; color: gold;">
                                        <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(1)} 
                                        <span style="font-size: 10px;">/10</span>
                                    </p>
                                </div>
                            </a>
                        `)
                        .join('');
                document.querySelectorAll('.movie-link').forEach(link => {
                    link.addEventListener('click', function () {
                        const movieData = {
                        id: this.dataset.id,
                        title: this.dataset.title,
                        overview: this.dataset.overview,
                        rating: this.dataset.rating,
                        release_date: this.dataset.date
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });

            }
        }
    }
    else if (movie.id == "upcoming") {
        title.innerHTML+= " - Upcoming Movies"
        
        for (i = pages; i < 20; i++) {
            const MIN_DATE = new Date().toISOString().split('T')[0];
    
            const MAX_DATE = '3000-12-31';

            const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${MIN_DATE}&release_date.lte=${MAX_DATE}&page=${i}`;

            const response = await fetch (url)
            const data = await response.json()
            if (data.results.length > 0) {
                    all.innerHTML += data.results
                        .map(movie => `
                            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}">
                                <div class="movie" id="${movie.id}">
                                    <img class="movie-cover" 
                                        src="${image_url + movie.poster_path}" 
                                        alt="${movie.title || movie.name}" 
                                        loading="lazy">
                                    <p class="movie-title" style="font-size: 14px;">
                                        ${movie.title || movie.name}
                                    </p>
                                    <p class="movie-ratings" style="font-size: 12px; color: gold;">
                                        <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(1)} 
                                        <span style="font-size: 10px;">/10</span>
                                    </p>
                                </div>
                            </a>
                        `)
                        .join('');
                document.querySelectorAll('.movie-link').forEach(link => {
                    link.addEventListener('click', function () {
                        const movieData = {
                        id: this.dataset.id,
                        title: this.dataset.title,
                        overview: this.dataset.overview,
                        rating: this.dataset.rating,
                        release_date: this.dataset.date
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });

            }
        }
    }
}
getMovies()