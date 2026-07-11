/*==========================================
    KIVUSTREAM TMDB API
==========================================*/

const API_KEY = "8b8937bf3e114fa3502358a4f090c0df";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p";

const POSTER_SIZE = "/w500";

const BACKDROP_SIZE = "/original";

const CACHE_TIME = 1000 * 60 * 10; // 10 Minutes

/*==========================================
    CACHE
==========================================*/

function getCache(key){

    const item = localStorage.getItem(key);

    if(!item) return null;

    const data = JSON.parse(item);

    if(Date.now() > data.expire){

        localStorage.removeItem(key);

        return null;

    }

    return data.value;

}

function setCache(key,value){

    localStorage.setItem(

        key,

        JSON.stringify({

            value,

            expire: Date.now() + CACHE_TIME

        })

    );

}

/*==========================================
    FETCH
==========================================*/

async function request(endpoint){

    const cacheKey = endpoint;

    const cached = getCache(cacheKey);

    if(cached) return cached;

    try{

        const response = await fetch(

            `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`

        );

        if(!response.ok){

            throw new Error("TMDB Request Failed");

        }

        const data = await response.json();

        setCache(cacheKey,data);

        return data;

    }

    catch(error){

        console.error(error);

        return null;

    }

}

/*==========================================
    IMAGE
==========================================*/

export function poster(path){

    return path

        ? `${IMAGE_URL}${POSTER_SIZE}${path}`

        : "assets/images/no-poster.webp";

}

export function backdrop(path){

    return path

        ? `${IMAGE_URL}${BACKDROP_SIZE}${path}`

        : "assets/images/no-backdrop.webp";

}

/*==========================================
    FORMAT
==========================================*/

function formatMovie(movie){

    return{

        id:movie.id,

        title:movie.title || movie.name,

        overview:movie.overview,

        poster:poster(movie.poster_path),

        backdrop:backdrop(movie.backdrop_path),

        rating:movie.vote_average,

        year:(movie.release_date || movie.first_air_date || "").substring(0,4),

        language:(movie.original_language || "").toUpperCase(),

        release:movie.release_date,

        genre_ids:movie.genre_ids,

        popularity:movie.popularity,

        type:movie.title ? "movie" : "tv"

    };

}

/*==========================================
    MOVIES
==========================================*/

export async function trendingMovies(){

    const data = await request("/trending/movie/week");

    return data?.results.map(formatMovie) || [];

}

export async function popularMovies(){

    const data = await request("/movie/popular");

    return data?.results.map(formatMovie) || [];

}

export async function topRatedMovies(){

    const data = await request("/movie/top_rated");

    return data?.results.map(formatMovie) || [];

}

export async function latestMovies(){

    const data = await request("/movie/now_playing");

    return data?.results.map(formatMovie) || [];

}

export async function upcomingMovies(){

    const data = await request("/movie/upcoming");

    return data?.results.map(formatMovie) || [];

}

/*==========================================
    TV SERIES
==========================================*/

export async function trendingSeries(){

    const data = await request("/trending/tv/week");

    return data?.results.map(formatMovie) || [];

}

export async function popularSeries(){

    const data = await request("/tv/popular");

    return data?.results.map(formatMovie) || [];

}

/*==========================================
    GENRES
==========================================*/

export async function genreMovies(id){

    const data = await request(

        `/discover/movie?with_genres=${id}`

    );

    return data?.results.map(formatMovie) || [];

}

/*==========================================
    SEARCH
==========================================*/

export async function searchMovies(query){

    if(!query) return [];

    const data = await request(

        `/search/movie?query=${encodeURIComponent(query)}`

    );

    return data?.results.map(formatMovie) || [];

}

/*==========================================
    DETAILS
==========================================*/

export async function movieDetails(id){

    return await request(

        `/movie/${id}`

    );

}

export async function tvDetails(id){

    return await request(

        `/tv/${id}`

    );

}

/*==========================================
    SIMILAR
==========================================*/

export async function similarMovies(id){

    const data = await request(

        `/movie/${id}/similar`

    );

    return data?.results.map(formatMovie) || [];

}

/*==========================================
    EXPORT
==========================================*/

export default{

    trendingMovies,

    popularMovies,

    topRatedMovies,

    latestMovies,

    upcomingMovies,

    trendingSeries,

    popularSeries,

    genreMovies,

    searchMovies,

    movieDetails,

    tvDetails,

    similarMovies

};
