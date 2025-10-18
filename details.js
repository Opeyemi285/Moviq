// Get movie data from sessionStorage
const movie = JSON.parse(sessionStorage.getItem('selectedMovie'));

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// Select where to display the movie details
const movieDetails = document.querySelector('.movie-details');

if (!movie) {
    movieDetails.innerHTML = `<p>No movie selected. Please go back and pick one.</p>`;
} else {
    // Fetch trailer for the selected movie
    async function loadMovieDetails() {
        const trailerURL = `${BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`;

        try {
            const response = await fetch(trailerURL);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            // Find YouTube trailer if available
            const trailer = data.results.find(v => v.site === "YouTube" && v.type === "Trailer");

            // Build movie HTML
            movieDetails.innerHTML = `
                <div class="movie-container">
                    <div class="trailer">
                        ${trailer
                            ? `<iframe 
                                id="trailer-player"
                                src="https://www.youtube.com/embed/${trailer.key}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                               </iframe>`
                            : `<p style="color: gray;">Trailer not available.</p>`
                        }
                    </div>

                    <div class="movie-descs">
                        <h3>${movie.title}</h3>
                        <p class="movie-ratings" style="font-size: 20px; color: gold;">
                            <i class="bi bi-star-fill"></i> ${parseFloat(movie.rating).toFixed(1)} 
                            <span style="font-size: 14px; color: white;">/10</span>
                        </p>
                        <p class="movie-overview">${movie.overview}</p>
                    </div>
                </div>
            `;

        } catch (error) {
            console.error("Error fetching trailer:", error);
            movieDetails.innerHTML = `<p style="color: red;">Unable to load movie details. Please check your internet connection.</p>`;
        }
    }

    // Call the async function
    loadMovieDetails();
}
