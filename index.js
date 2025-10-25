sessionStorage.removeItem('selectedMovie');
sessionStorage.removeItem('movies');

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original';
const pages = 1;
const main = document.querySelector('main');
const search = document.querySelector('.search-input');
const container = document.querySelector('.banner')
const popular = document.querySelector('.popular-movies')
const trending = document.querySelector('.trending-movies')
const top_rated = document.querySelector('.top-rated-movies')
const upcoming = document.querySelector('.upcoming-movies')
const popular_TV = document.querySelector(".popular-tv") 
const TopRated_TV = document.querySelector(".top-rated-tv")

async function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${pages}`;

    try {
        const response = await fetch(url);
        
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
                    <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="movie">
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
                        release_date: this.dataset.date,
                        media_type: this.dataset.type,
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });

            }

    } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("Could not load movies. Please check your internet connection.");
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
            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="movie">
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
                        release_date: this.dataset.date,
                        media_type: this.dataset.type,
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
        top_rated.innerHTML += data.results
        .map(movie => `
            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="movie">
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
                        release_date: this.dataset.date,
                        media_type: this.dataset.type,
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });
    }
}
TopRatedMovies();

async function getUpcomingMovies() {
    const MIN_DATE = new Date().toISOString().split('T')[0];
    
    const MAX_DATE = '3000-12-31';

    const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${MIN_DATE}&release_date.lte=${MAX_DATE}`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results.length > 0) {
        upcoming.innerHTML += data.results
            .map(movie => `
                <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="movie">
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
                    release_date: this.dataset.date,
                    media_type: this.dataset.type,
                };
                sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
            });
        });

    }
}
getUpcomingMovies();

async function popularTV() {
    const url = `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${pages}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.results.length > 0) {
        popular_TV.innerHTML += data.results
        .map(movie => `
            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="tv">
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
                        release_date: this.dataset.date,
                        media_type: this.dataset.type,
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });
    }
}
popularTV();

async function top_ratedTV() {
    const url = `${BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&page=${pages}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.results.length > 0) {
        TopRated_TV.innerHTML += data.results
        .map(movie => `
            <a href="/details.html" class="movie-link" data-id="${movie.id}" data-title="${movie.title || movie.name}" data-overview="${movie.overview}" data-rating="${movie.vote_average}" data-date="${movie.release_date || movie.first_air_date || 'N/A'}" data-type="tv">
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
                        release_date: this.dataset.date,
                        media_type: this.dataset.type,
                        };
                        sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
                    });
                });
    }
}
top_ratedTV();








async function searchAll(query) {
    // 1. If the search bar is empty, reload the original content (or just stop)
    if (!query || query.trim() === '') {
        // You might want to reload the page or re-run all your original functions 
        // (getPopularMovies(), TrendingMovies(), etc.) here.
        // For simplicity, we'll just stop the search.
        console.log("Search query is empty. Returning to main view.");
        // Reloading is the easiest way to reset the page content if needed
        // window.location.reload(); 
        
        // OR: You can re-run all your loading functions to restore the home page view:
        main.innerHTML = ''; // Clear main content
        getPopularMovies();
        TrendingMovies();
        TopRatedMovies();
        getUpcomingMovies();
        popularTV();
        // If you had a dedicated function to load the home page layout, call it here.
        return; 
    }

    // 2. Clear the ENTIRE main content area to prepare for search results
    main.innerHTML = '<div class="loading-message" style="text-align: center; padding: 50px;">Searching...</div>';
    
    // 3. Construct the API URL
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodedQuery}&page=${pages}&language=en-US`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 4. Display the results in the now-empty main element
        displaySearchResults(data.results, query.trim());

    } catch (error) {
        console.error("Failed to fetch search results:", error);
        main.innerHTML = '<div class="error-message" style="text-align: center; padding: 50px;">An error occurred while fetching results.</div>';
    }
}

/**
 * Renders the search results (movies and TV shows only) to the DOM.
 */
function displaySearchResults(results, query) {
    // Clear the main content again to remove the loading message
    main.innerHTML = ''; 
    
    // Filter out 'person' results and items without a poster
    const mediaResults = results
        .filter(item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path); 

    let htmlContent = `<div class="search-header" style="padding: 20px 0 10px 0;">
                           <h4>Results for: "${query}"</h4>
                       </div>`;

    if (mediaResults.length === 0) {
        htmlContent += '<p style="text-align: center;">No movies or TV shows found for your search.</p>';
        main.innerHTML = htmlContent;
        return;
    }

    // Start the grid container for the results
    htmlContent += '<div class="search-results-grid flex-row" style="flex-wrap: wrap; gap: 20px;">';

    // Map the media items to HTML
    htmlContent += mediaResults
        .map(item => {
            const title = item.title || item.name;
            const release_date = item.release_date || item.first_air_date || 'N/A';
            const media_type = item.media_type;

            return `
                <a href="/details.html" class="movie-link" 
                   data-id="${item.id}" 
                   data-title="${title}" 
                   data-overview="${item.overview}" 
                   data-rating="${item.vote_average}" 
                   data-date="${release_date}" 
                   data-type="${media_type}"> 
                    <div class="movie" id="${item.id}" style="width: 150px; text-align: center;">
                        <img class="movie-cover" 
                            src="${image_url + item.poster_path}" 
                            alt="${title}" 
                            loading="lazy"
                            style="width: 100%; height: auto; border-radius: 8px;">
                        <p class="movie-title" style="font-size: 14px; margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${title}
                            <span style="font-size: 10px; color: #aaa;">(${media_type === 'movie' ? 'Movie' : 'TV'})</span>
                        </p>
                        <p class="movie-ratings" style="font-size: 12px; color: gold;">
                            <i class="bi bi-star-fill"></i> ${(item.vote_average).toFixed(1)} 
                            <span style="font-size: 10px;">/10</span>
                        </p>
                    </div>
                </a>
            `;
        }).join('');

    // Close the grid container
    htmlContent += '</div>';
    
    // Inject all HTML into the main element
    main.innerHTML = htmlContent;

    // Attach click listeners to the dynamically created links
    main.querySelectorAll('.movie-link').forEach(link => {
        link.addEventListener('click', function () {
            const movieData = {
                id: this.dataset.id,
                title: this.dataset.title,
                overview: this.dataset.overview,
                rating: this.dataset.rating,
                release_date: this.dataset.date,
                media_type: this.dataset.type
            };
            sessionStorage.setItem('selectedMovie', JSON.stringify(movieData));
        });
    });
}

search.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        const query = search.value.trim();
        searchAll(query);
    }
});

document.querySelectorAll('.see-all').forEach(link => {
    link.addEventListener('click', function () {
        const allMovies = {
            id: this.id
        };
        sessionStorage.setItem('movies', JSON.stringify(allMovies));
    });
});




