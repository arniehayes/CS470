//window.onload = localStorage.getItem("storageName");

const APIURL =
  "https://api.themoviedb.org/3/movie/" +
  localStorage.getItem("storageName") +
  "?api_key=94f2d3081ba573d2f171f0f8020eb38a";
IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";
youtube_key = "AIzaSyDe68Us2DPqMVN5o4EB0oFilwmyuYgL_gI"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

console.log("Movie ID:",localStorage.getItem("storageName"))
console.log("Movie Title:",localStorage.getItem("storageTitle"))

youtube_search = localStorage.getItem("storageTitle") + " Trailer";
// initially get fav movies
getMovies(APIURL);

async function getYoutubeURL() {
  // Construct YouTube API search for the movie trailer
  youtube_search = localStorage.getItem("storageTitle") + localStorage.getItem("releaseYear") + " Trailer";
  console.log("Search:", youtube_search)
  APIsearch =  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + youtube_search + "&key=" + youtube_key;

  const resp = await fetch(APIsearch);
  const respData = await resp.json();
  console.log("YouTube API return:",respData);

  // Construct Youtube video URL
  youtube_url = "https://www.youtube.com/embed/" + respData.items[0].id.videoId
  console.log("Youtube Video URL:", youtube_url)
}

async function getMovies(url) {
  // Construct YouTube API search for the movie trailer
  youtube_search = localStorage.getItem("storageTitle") + ' ' + localStorage.getItem("releaseYear") + " Trailer";
  console.log("Search:", youtube_search)
  APIsearch =  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + youtube_search + "&key=" + youtube_key;

  const y_resp = await fetch(APIsearch);
  const y_respData = await y_resp.json();
  console.log("YouTube API return:",y_respData);
  // Construct Youtube video URL
  youtube_url = "https://www.youtube.com/embed/" + y_respData.items[0].id.videoId
  console.log("Youtube Video URL:", youtube_url)

  const resp = await fetch(url);
  const respData = await resp.json();

  console.log("IMDB Object:", respData);
  showMovies(respData, youtube_url);
}

function showMovies(movies, youtubeURL) {
  // clear main
  main.innerHTML = "";

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
              <iframe class = "video" src="${youtubeURL}"} allowfullscreen>
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