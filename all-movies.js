const movie = JSON.parse(sessionStorage.getItem('movies'));
console.log(movie.id);

const TMDB_API_KEY = '960a5f1a965366de5f1696d8f95457c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original';
const pages = 1;