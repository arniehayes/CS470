APIURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&page=";

TVAPI1 =
  "https://api.themoviedb.org/3/discover/tv?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&page=";

TVAPI2 =
  "&timezone=America%2FNew_York&with_genres=10762&include_null_first_air_dates=false";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

SEARCHAPI1 =
  "https://api.themoviedb.org/3/search/multi?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&page=";

SEARCHAPI2 = "&include_adult=false&query=";

TVSEARCHAPI1 =
  "https://api.themoviedb.org/3/search/tv?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&page=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
for (i = 1; i < 50; i++) {
  getMovies(APIURL + i);
}
for (i = 1; i < 50; i++) {
  getTV(TVAPI1 + i + TVAPI2);
}

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
}

async function getSearchMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showSearchMovies(respData.results);
}

async function getTV(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showTV(respData.results);
}

function showTV(TV) {
  TV.forEach((show) => {
    // Checking if the rating is family: 10762 or child: 10751
    var rating = false;
    const { poster_path, name, id, genre_ids } = show;
    for (var i = 0; i < genre_ids.length - 1; i++) {
      if (genre_ids[i] == 10762 || genre_ids[i] == 10751) {
        rating = true;
      }
    }
    if (rating) {
      // Making sure the file is not corrupted
      if (poster_path != null && name != null) {
        const tvEL = document.createElement("div");
        tvEL.classList.add("movie");

        tvEL.innerHTML = `
                <a href="tv_description.html" id="${id}" onclick="getID(this.id)">
                    <img
                        src="${IMGPATH + poster_path}"
                        alt="${name}"
                    />
                </a>
                <div class="movie-info">
                    <h3>${name}</h3>
                </div>
                `;

        main.appendChild(tvEL);
      }
    }
  });
}

function showMovies(movies) {
  // clear main
  //main.innerHTML = "";

  movies.forEach((movie) => {
    // Checking if the rating is family: 10762
    var rating = false;
    for (var i = 0; i < movie.genre_ids.length - 1; i++) {
      if (movie.genre_ids[i] == 27 || movie.genre_ids[i] == 99) {
        break;
      }
      if (movie.genre_ids[i] == 10751) {
        rating = true;
      }
    }
    if (rating) {
      // Making sure the file is not corrupted
      const { poster_path, title, overview, id, release_date } = movie;
      if (poster_path != null && title != null) {
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
      }
    }
  });
}


function getID(clickedID, clickedTitle, clickedRelease) {
  localStorage.setItem("storageName", clickedID);
  localStorage.setItem("storageTitle", clickedTitle);
  // Splice the release date to get the year only.
  release = clickedRelease.slice(0, 4);
  localStorage.setItem("releaseYear", release);
}

// Search
// NEED TO
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  localStorage.setItem("lookup", searchTerm)
  window.location.href = "results.html"
});
