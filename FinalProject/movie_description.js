//window.onload = localStorage.getItem("storageName");

const APIURL =
  "https://api.themoviedb.org/3/movie/" +
  localStorage.getItem("storageName") +
  "?api_key=94f2d3081ba573d2f171f0f8020eb38a";
IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";
youtube_key = "AIzaSyBGFtH68BFY9L-iNkVF1IuzZdWYiIRqg_A"
const PROVIDERURL =
  "https://api.themoviedb.org/3/movie/" +
  localStorage.getItem("storageName") +
  "/watch/providers?api_key=94f2d3081ba573d2f171f0f8020eb38a";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

console.log("Movie ID:",localStorage.getItem("storageName"))
console.log("Movie Title:",localStorage.getItem("storageTitle"))

youtube_search = localStorage.getItem("storageTitle") + " Trailer";
// initially get fav movies
getMovies(APIURL);

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

  const prov_resp = await fetch(PROVIDERURL);
  const prov_respData = await prov_resp.json();

  console.log("provider Resp data:", prov_respData)
  
  if(typeof(prov_respData.results.US) === "undefined")
  {
    service_string = "Unknown"
  }
  else
    {
    // Initialize services array.
    services = [];
    if(typeof(prov_respData.results.US.buy) != "undefined")
    {
      buy_list = prov_respData.results.US.buy;
      console.log("buy list:", buy_list);
      // Get streaming services from buy list.
      if(buy_list.length > 0)
      {
        for(i = 0; i < buy_list.length; i++)
        {
          services.push(buy_list[i].provider_name)
        }
      }
      console.log("Services after buy_list:", services)
    }

    if(typeof(prov_respData.results.US.flatrate) != "undefined")
    {
      flatrate_list = prov_respData.results.US.flatrate;
      console.log("flatrate list:", flatrate_list);
      if(flatrate_list.length > 0)
      {
        // Get streaming services from flat_list.
        for(i = 0; i < flatrate_list.length; i++)
        {
          services.push(flatrate_list[i].provider_name)
        }
      }
      console.log("Services after flatrate_list:", services)
    }

    // Create the service provider string.
    service_string = ""
    if(services.length > 0)
    {
      // Get rid of duplicates
      services = [...new Set(services)];
      for(i = 0; i < services.length; i++)
      {
        if(i == services.length - 1)
        {
          service_string = service_string + services[i];
        }
        else
        {
          service_string = service_string + services[i] + ", ";
        }
      }
    }
    else
    {
      service_string = "Unknown"
    }
  }
  console.log("Service string:", service_string)

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
              <img class = "image" src="${IMGPATH + poster_path}">

              <iframe class = "video" src="${youtubeURL}"} allowfullscreen>
              </iframe>

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
                  <p class = "card-text genre-service-text">${service_string}</p>
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