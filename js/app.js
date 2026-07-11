/*==========================================
    KIVUSTREAM APP
==========================================*/

import {
    trendingMovies,
    popularMovies,
    latestMovies,
    topRatedMovies,
    trendingSeries,
    genreMovies
} from "./api.js";

import { createMovieCard } from "./movieCard.js";

/*==========================================
    COMPONENT LOADER
==========================================*/

async function loadComponent(id, file){

    const container = document.getElementById(id);

    if(!container) return;

    try{

        const res = await fetch(`components/${file}`);

        container.innerHTML = await res.text();

    }

    catch(err){

        console.error(err);

    }

}

/*==========================================
    HERO
==========================================*/

async function loadHero(){

    const movies = await trendingMovies();

    if(!movies.length) return;

    const movie = movies[0];

    document.getElementById("heroBackdrop").src =
        movie.backdrop;

    document.getElementById("heroPoster").src =
        movie.poster;

    document.getElementById("heroTitle").textContent =
        movie.title;

    document.getElementById("heroOverview").textContent =
        movie.overview;

    document.getElementById("heroRating").textContent =
        movie.rating.toFixed(1);

    document.getElementById("heroYear").textContent =
        movie.year;

}

/*==========================================
    SECTION
==========================================*/

async function renderSection(id,title,data){

    const section=document.getElementById(id);

    if(!section) return;

    section.innerHTML=`

    <div class="container section">

        <div class="section-header">

            <h2 class="section-title">

                ${title}

            </h2>

            <a href="#" class="view-all">

                View All

            </a>

        </div>

        <div class="movie-slider">

            ${
                data.map(createMovieCard).join("")
            }

        </div>

    </div>

    `;

}

/*==========================================
    HOME
==========================================*/

async function loadHome(){

    const [

        trending,

        latest,

        popular,

        top,

        tv,

        action

    ] = await Promise.all([

        trendingMovies(),

        latestMovies(),

        popularMovies(),

        topRatedMovies(),

        trendingSeries(),

        genreMovies(28)

    ]);

    await loadHero();

    renderSection(

        "trendingMovies",

        "Trending Movies",

        trending

    );

    renderSection(

        "latestMovies",

        "Latest Movies",

        latest

    );

    renderSection(

        "popularMovies",

        "Popular Movies",

        popular

    );

    renderSection(

        "topRatedMovies",

        "Top Rated",

        top

    );

    renderSection(

        "series",

        "Trending TV Series",

        tv

    );

    renderSection(

        "actionMovies",

        "Action Movies",

        action

    );

}

/*==========================================
    LOADER
==========================================*/

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.remove();

        },500);

    }

});

/*==========================================
    START
==========================================*/

(async()=>{

    await loadComponent(

        "navbar",

        "navbar.html"

    );

    await loadComponent(

        "hero",

        "hero.html"

    );

    await loadComponent(

        "footer",

        "footer.html"

    );

    await loadHome();

})();
