/*==========================================
    KIVUSTREAM HERO SLIDER
==========================================*/

let heroMovies = [];

let currentIndex = 0;

let autoSlide;

/*==========================================
    INIT
==========================================*/

export function initHeroSlider(movies){

    if(!movies || !movies.length) return;

    heroMovies = movies.slice(0,8);

    currentIndex = 0;

    renderHero();

    createPagination();

    startAutoSlide();

    events();

}

/*==========================================
    RENDER
==========================================*/

function renderHero(){

    const movie = heroMovies[currentIndex];

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

    document.getElementById("watchNowBtn").href =
        `watch.html?id=${movie.id}`;

    updatePagination();

}

/*==========================================
    NEXT
==========================================*/

function nextSlide(){

    currentIndex++;

    if(currentIndex >= heroMovies.length){

        currentIndex = 0;

    }

    renderHero();

}

/*==========================================
    PREVIOUS
==========================================*/

function previousSlide(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = heroMovies.length-1;

    }

    renderHero();

}

/*==========================================
    AUTO
==========================================*/

function startAutoSlide(){

    clearInterval(autoSlide);

    autoSlide = setInterval(

        nextSlide,

        6000

    );

}

/*==========================================
    PAGINATION
==========================================*/

function createPagination(){

    const container =
        document.getElementById("heroPagination");

    container.innerHTML = "";

    heroMovies.forEach((movie,index)=>{

        const dot =
            document.createElement("span");

        dot.onclick=()=>{

            currentIndex=index;

            renderHero();

            startAutoSlide();

        };

        container.appendChild(dot);

    });

}

function updatePagination(){

    document
        .querySelectorAll("#heroPagination span")
        .forEach((dot,index)=>{

            dot.classList.toggle(

                "active",

                index===currentIndex

            );

        });

}

/*==========================================
    EVENTS
==========================================*/

function events(){

    document
        .querySelector(".hero-next")
        ?.addEventListener(

            "click",

            ()=>{

                nextSlide();

                startAutoSlide();

            }

        );

    document
        .querySelector(".hero-prev")
        ?.addEventListener(

            "click",

            ()=>{

                previousSlide();

                startAutoSlide();

            }

        );

}

/*==========================================
    KEYBOARD
==========================================*/

document.addEventListener(

    "keydown",

    e=>{

        if(e.key==="ArrowRight"){

            nextSlide();

            startAutoSlide();

        }

        if(e.key==="ArrowLeft"){

            previousSlide();

            startAutoSlide();

        }

    }

);
