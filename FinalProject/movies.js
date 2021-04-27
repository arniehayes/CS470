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

genreid = 0;
serviceid = 0;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function searchMovie(){
    servicetag = "";
    genretag = "";
    if(serviceid)
        servicetag = "&with_watch_providers=" + serviceid + "&watch_region=US";
    if(genreid)
        genretag = "&with_genres=" + genreid;
    for (i = 1; i < 50; i++) {
        getMovies(APIURL + i + genretag + servicetag);
    }
}

// initially get fav movies
searchMovie();

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  //console.log(respData);

  showMovies(respData.results);
}

async function getSearchMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  //console.log(respData);

  showSearchMovies(respData.results);
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
      const { poster_path, title, overview, id, release_date, original_language } = movie;
      if (poster_path != null && title != null && overview != "" && original_language === "en") {
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

function genreClick() {
  document.getElementById("genreDropdown").classList.toggle("show");
}

function servicesClick() {
  document.getElementById("servicesDropdown").classList.toggle("show");
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

function genreClick() {
  document.getElementById("genreDropdown").classList.toggle("show");
}

function StreamingFilter(ID){
    main.innerHTML = "";
    serviceid = ID;
    if(!ID){
        document.getElementById("SSDrop").innerHTML = "Streaming Service";
    }
    else if(ID == 15)
        document.getElementById("SSDrop").innerHTML = "Hulu";
    else if(ID == 8)
        document.getElementById("SSDrop").innerHTML = "Netflix";
    else if(ID == 9)
        document.getElementById("SSDrop").innerHTML = "Amazon Prime";
    else if(ID == 387)
        document.getElementById("SSDrop").innerHTML = "Peacock";
    else if(ID == 337)
        document.getElementById("SSDrop").innerHTML = "Disney Plus";
    else if(ID == 257)
        document.getElementById("SSDrop").innerHTML = "Fubo TV";
    else if(ID == 105)
        document.getElementById("SSDrop").innerHTML = "Fandango";
    else if(ID == 3)
        document.getElementById("SSDrop").innerHTML = "Google Play";
    else if(ID == 2)
        document.getElementById("SSDrop").innerHTML = "Apple TV";
    else if(ID == 384)
        document.getElementById("SSDrop").innerHTML = "HBO Max";
    else if(ID == 248)
        document.getElementById("SSDrop").innerHTML = "Boomerang";
    else if(ID == 68)
        document.getElementById("SSDrop").innerHTML = "Microsoft Store";
    else if(ID == 279)
        document.getElementById("SSDrop").innerHTML = "Redbox";
    else if(ID == 358)
        document.getElementById("SSDrop").innerHTML = "DirectTV";
    searchMovie();
}

function GenreFilter(ID){
    main.innerHTML = "";
    genreid = ID;
    if(!ID){
        document.getElementById("GDrop").innerHTML = "Genre";
    }
    else if(ID == 28)
        document.getElementById("GDrop").innerHTML = "Action";
    else if(ID == 12)
        document.getElementById("GDrop").innerHTML = "Adventure";
    else if(ID == 16)
        document.getElementById("GDrop").innerHTML = "Animation";
    else if(ID == 35)
        document.getElementById("GDrop").innerHTML = "Comedy";
    else if(ID == 14)
        document.getElementById("GDrop").innerHTML = "Fantasy";
    //else if(ID == 9648)
        //document.getElementById("GDrop").innerHTML = "Mystery";
    else
        document.getElementById("GDrop").innerHTML = "SciFi";
    searchMovie();
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

