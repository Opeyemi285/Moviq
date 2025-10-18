sessionStorage.removeItem('selectedMovie');

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original';
const pages = 1
const main = document.getElementsByName('main');
const search = document.getElementById('search');
const container = document.querySelector('.banner')
const popular = document.querySelector('.popular-movies')
const trending = document.querySelector('.trending-movies')
const top_rated = document.querySelector('.top-rated-movies')
const upcoming = document.querySelector('.upcoming-movies')

async function getPopularMovies() {
    // Construct the URL, appending the api_key as a query parameter
    const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${pages}`;

    try {
        const response = await fetch(url);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.results.length > 0) {
            container.innerHTML = `
                <img class="banner-img" src="${image_url + data.results[0].backdrop_path}" alt="${data.results[0].title}" style="">
                <div class="banner-texts">
                    <h3>${data.results[0].title}</h3>
                    <p class="movie-ratings" style="font-size: 30px;"> <i class="bi bi-star-fill"></i> ${(data.results[0].vote_average).toFixed(1)} <span style="font-size: 16px;">/10</span></p>
                </div>
            `;
            popular.innerHTML += data.results
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

    } catch (error) {
        alert("Make sure you are connected to the internet", error);
    }
}

getPopularMovies();

async function TrendingMovies() {
    const url = `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&page=${pages}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results.length > 0) {
    trending.innerHTML += data.results
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
TrendingMovies();

async function TopRatedMovies() {
    const url = `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${pages}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.results.length > 0) {
        console.log(data.results[0].release_date)
        top_rated.innerHTML += data.results
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
TopRatedMovies();
// async function UpcomingMovies(){
//     const url = `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${pages}`
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     if (data.results.length > 0) {
//         upcoming.innerHTML += data.results
//         .map(movie => `
//             <div class="movie" id="${movie.id}">
//                 <img class="movie-cover" src="${image_url + movie.poster_path}" 
//                     alt="${movie.title || movie.name}" loading="lazy">
//                 <p class="movie-title" font-size: 14px;">${movie.title || movie.name}</p>
//                 <p class="movie-ratings" style="font-size: 12px; color: gold;"> <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(1)} <span style="font-size: 10px;">/10</span></p>
//             </div>
//         `)
//         .join('');
//     }
// }
// UpcomingMovies();


