/*==========================================
    KIVUSTREAM MOVIE CARD
==========================================*/

export function createMovieCard(movie) {

    const year = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "0.0";

    const quality = movie.quality || "HD";

    return `

    <article
        class="movie-card fade-up"
        data-id="${movie.id}">

        <div class="movie-poster">

            <img
                loading="lazy"
                src="${movie.poster}"
                alt="${movie.title}">

            <div class="movie-overlay">

                <a
                    href="watch.html?id=${movie.id}"
                    class="play-circle">

                    <i class="fa-solid fa-play"></i>

                </a>

                <button
                    class="favorite-btn"
                    title="My List">

                    <i class="fa-regular fa-heart"></i>

                </button>

            </div>

            <span class="quality">

                ${quality}

            </span>

            <span class="rating">

                <i class="fa-solid fa-star"></i>

                ${rating}

            </span>

        </div>

        <div class="movie-info">

            <h3>

                ${movie.title}

            </h3>

            <div class="movie-meta">

                <span>${year}</span>

                <span>•</span>

                <span>${movie.language || "EN"}</span>

            </div>

        </div>

    </article>

    `;

}
