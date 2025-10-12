const key = '960a5f1a965366de5f1696d8f95457c0'

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original/';
const pages = 1
const container = document.querySelector('.banner')
const trending = document.querySelector('.trending-movies')

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
        // console.log("Popular Movies Data:", data.results);
        if (data.results.length > 0) {
            // console.log("First movie title:", data.results[0].title);
            // data.results.forEach(movie => {
            //     const movieElement = document.createElement('div');
            //     movieElement.classList.add('movie');
            //     movieElement.innerHTML = `
            //         <img src="${image_url + movie.poster_path}" alt="${movie.title}">
            //         <h3>${movie.title}</h3>
            //         <p>Rating: ${movie.vote_average}</p>
            //     `;
            //     container.appendChild(movieElement);
            // });
            container.innerHTML = `
                <img class="banner-img" src="${image_url + data.results[0].backdrop_path}" alt="${data.results[0].title}" style="">
                <div class="banner-texts">
                    <h3 style="color: white;">${data.results[0].title}</h3>
                    <p style="color: gold; font-size:30px;"> <i class="bi bi-star-fill"></i> ${(data.results[0].vote_average).toFixed(2)} <span style="font-size: 16px;">/10</span></p>
                </div>
            `;
            trending.innerHTML += data.results
            .map(movie => `
                <div class="movie" style="width: 100%;">
                    <img src="${image_url + movie.poster_path}" 
                        alt="${movie.title}" 
                        style="width: 150px; height: 225px; border-radius: 10px; margin-right: 10px;">
                    <p font-size: 14px;">${movie.title}</p>
                    <p style="font-size: 12px; color: gold;"> <i class="bi bi-star-fill"></i> ${(movie.vote_average).toFixed(2)} <span style="font-size: 10px;">/10</span></p>
                </div>
            `)
            .join('');

        }

    } catch (error) {
        alert("Could not fetch data:", error);
    }
}

getPopularMovies();