const key = '960a5f1a965366de5f1696d8f95457c0'

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/w300/';

async function getPopularMovies() {
    // Construct the URL, appending the api_key as a query parameter
    const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`;

    try {
        const response = await fetch(url);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Popular Movies Data:", data.results);
        
        // Example: Log the title of the first movie
        if (data.results.length > 0) {
            console.log("First movie title:", data.results[0].title);
        }

    } catch (error) {
        console.error("Could not fetch data:", error);
    }
}

getPopularMovies();