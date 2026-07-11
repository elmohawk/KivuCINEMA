/*==========================================
    KIVUSTREAM WATCH PAGE
==========================================*/

import {
    movieDetails,
    similarMovies
} from "./api.js";

import {
    getMovie,
    getEpisodes
} from "./supabase.js";

import { createMovieCard } from "./movieCard.js";

/*==========================================
    URL PARAMS
==========================================*/

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

const episode = params.get("episode");

/*==========================================
    PLAYER
==========================================*/

const player = document.getElementById("player");

/*==========================================
    LOAD
==========================================*/

async function loadMovie(){

    if(!movieId) return;

    const tmdb = await movieDetails(movieId);

    const db = await getMovie(movieId);

    renderMovie(tmdb);

    loadPlayer(db);

    loadDownloads(db);

    loadServers(db);

    loadRelated();

}

/*==========================================
    MOVIE
==========================================*/

function renderMovie(movie){

    document.getElementById("watchTitle").textContent =
        movie.title;

    document.getElementById("watchOverview").textContent =
        movie.overview;

    document.getElementById("watchMeta").innerHTML = `

        ⭐ ${movie.vote_average.toFixed(1)}

        •

        ${movie.release_date.substring(0,4)}

        •

        ${movie.runtime} min

    `;

}

/*==========================================
    PLAYER
==========================================*/

function loadPlayer(movie){

    if(!movie) return;

    player.src = movie.stream_url;

    player.poster =
        `https://image.tmdb.org/t/p/original${movie.backdrop}`;

}

/*==========================================
    DOWNLOADS
==========================================*/

function loadDownloads(movie){

    const box =
        document.getElementById("downloadList");

    if(!movie.download_links?.length){

        box.innerHTML =
        "No downloads available.";

        return;

    }

    box.innerHTML = movie.download_links.map(link=>`

        <a

            href="${link}"

            class="download-btn"

            target="_blank">

            <i class="fa-solid fa-download"></i>

            Download

        </a>

    `).join("");

}

/*==========================================
    SERVERS
==========================================*/

function loadServers(movie){

    const servers =
        document.getElementById("serverList");

    if(!movie.servers){

        servers.innerHTML = "";

        return;

    }

    servers.innerHTML = movie.servers.map(server=>`

        <button

            class="server-btn"

            data-url="${server.url}">

            ${server.name}

        </button>

    `).join("");

    document
    .querySelectorAll(".server-btn")
    .forEach(btn=>{

        btn.onclick=()=>{

            player.src =
                btn.dataset.url;

            player.play();

        }

    });

}

/*==========================================
    RELATED
==========================================*/

async function loadRelated(){

    const movies =
        await similarMovies(movieId);

    document
        .getElementById("relatedMovies")
        .innerHTML = `

        <div class="container section">

            <div class="section-header">

                <h2 class="section-title">

                    More Like This

                </h2>

            </div>

            <div class="movie-slider">

                ${
                    movies
                    .map(createMovieCard)
                    .join("")
                }

            </div>

        </div>

        `;

}

/*==========================================
    CONTINUE WATCHING
==========================================*/

player?.addEventListener(

    "timeupdate",

    ()=>{

        localStorage.setItem(

            `watch_${movieId}`,

            player.currentTime

        );

    }

);

player?.addEventListener(

    "loadedmetadata",

    ()=>{

        const time =
            localStorage.getItem(

                `watch_${movieId}`

            );

        if(time){

            player.currentTime = time;

        }

    }

);

/*==========================================
    START
==========================================*/

loadMovie();
