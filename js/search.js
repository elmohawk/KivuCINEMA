/*==========================================
    KIVUSTREAM LIVE SEARCH
==========================================*/

import { searchMovies } from "./api.js";
import { createMovieCard } from "./movieCard.js";

const modal = document.getElementById("searchModal");

let timeout;

/*==========================================
    OPEN
==========================================*/

export function openSearch(){

    modal.classList.add("active");

    document
        .getElementById("searchInput")
        ?.focus();

}

/*==========================================
    CLOSE
==========================================*/

export function closeSearch(){

    modal.classList.remove("active");

}

/*==========================================
    INIT
==========================================*/

export function initSearch(){

    const button =
        document.getElementById("searchBtn");

    const close =
        document.getElementById("closeSearch");

    const input =
        document.getElementById("searchInput");

    if(button){

        button.onclick=openSearch;

    }

    if(close){

        close.onclick=closeSearch;

    }

    input?.addEventListener(

        "input",

        e=>{

            clearTimeout(timeout);

            timeout=setTimeout(()=>{

                performSearch(

                    e.target.value

                );

            },300);

        }

    );

}

/*==========================================
    SEARCH
==========================================*/

async function performSearch(keyword){

    const container =
        document.getElementById("searchResults");

    if(keyword.trim().length<2){

        container.innerHTML="";

        return;

    }

    container.innerHTML=
        "<div class='loading'>Searching...</div>";

    const movies=
        await searchMovies(keyword);

    if(!movies.length){

        container.innerHTML=

        `
        <div class="empty-search">

            No movies found.

        </div>
        `;

        return;

    }

    container.innerHTML=

        movies
        .map(createMovieCard)
        .join("");

}

/*==========================================
    ESC
==========================================*/

document.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Escape"){

            closeSearch();

        }

    }

);
