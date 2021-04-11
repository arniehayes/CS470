//window.onload = localStorage.getItem("storageName");

const APIURL =
  "https://api.themoviedb.org/3/movie/" +
  localStorage.getItem("storageName") +
  "?api_key=94f2d3081ba573d2f171f0f8020eb38a";
IMGPATH = "https://image.tmdb.org/t/p/w1280";
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

  showMovies(respData);
}

function showMovies(movies) {
  // clear main
  main.innerHTML = "";

  //const { poster_path, title, overview, id } = movies;
  
  const { poster_path, overview, genres } = movies;
  genre_string = "";
  for (i = 0; i < genres.length; i++){
      for (i = 0; i < genres.length; i++) {
        if (i == genres.length - 1) {
          genre_string = genre_string + genres[i].name;
        } else {
          genre_string = genre_string + genres[i].name + ", ";
        }
      }
  }

  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");

  movieEl.innerHTML = `
  <div class = "image-video">
          <div class="image-window">
              <img class = "image" src="${IMGPATH + poster_path}">
          </div>
          <div class="youtube-window">
              <iframe class = "video" src="">
              </iframe>
          </div>
      </div>

      <div class = "genre-service">
          <div class = "genre-container">
              <h1 class = "sect-title">Genre</h1>
              <div class="genre-card">             
                  <div class=""></div>
                  <p class = "card-text genre-service-text">${genre_string}</p>
                </div>
          </div>
          <div class= "service-container">
              <h1 class = "sect-title">Streaming Service</h1>
              <div class="service-card">             
                  <div class=""></div>
                  <p class = "card-text genre-service-text">Disney+</p>
                </div>
          </div>
      </div>


      <div class = "description">
              <h1 class = "sect-title">Description</h1>
              <div class="card">
                  <div class ="">            
                  <p class = "card-text">${overview}</p>
              </div>
              </div>
      </div>
      `;

  main.appendChild(movieEl);

}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});

/*var backdropIMG = IMGPATH + backdrop_path;

function setBackdrop() {
  document.body.style.backgroundImage =
    "backdropIMG";
}*/