APIURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";

  
SEARCHAPI1 =
  "https://api.themoviedb.org/3/search/multi?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&page=";

SEARCHAPI2 = "&include_adult=false&query=";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
for (i = 1; i < 50; i++) {
  getMovies(APIURL + i);
}


async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});

function genreClick() {
  document.getElementById("genreDropdown").classList.toggle("show");
}

function servicesClick() {
  document.getElementById("servicesDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    main.innerHTML = "";
    for (var i = 1; i < 100; i++) {
      getSearchMovies(SEARCHAPI1 + i + SEARCHAPI2 + searchTerm);
      getTV(TVSEARCHAPI1 + i + SEARCHAPI2 + searchTerm);
    }
    search.value = "";
  }
});
