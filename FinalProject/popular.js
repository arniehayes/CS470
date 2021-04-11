const APIURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");




// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, overview, id, release_date} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <a href="movie_description.html" onclick="getID(${id}, '${title}', '${release_date}')">
                <img
                    src="${IMGPATH + poster_path}"
                    alt="${title}"
                />
            </a>
            <div class="movie-info">
                <h3>${title}</h3>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getID(clickedID, clickedTitle, clickedRelease) {
    localStorage.setItem("storageName", clickedID);
    localStorage.setItem("storageTitle", clickedTitle);
    // Splice the release date to get the year only.
    release = clickedRelease.slice(0,4);
    localStorage.setItem("releaseYear", release);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});