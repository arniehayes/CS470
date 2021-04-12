//window.onload = localStorage.getItem("storageName");

const APIURL =
  "https://api.themoviedb.org/3/tv/" +
  localStorage.getItem("storageName") +
  "?api_key=94f2d3081ba573d2f171f0f8020eb38a";

const PROVIDERURL =
  "https://api.themoviedb.org/3/tv/" +
  localStorage.getItem("storageName") +
  "/watch/providers?api_key=94f2d3081ba573d2f171f0f8020eb38a";

IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
// getMovies(APIURL);
getTV(APIURL);

async function getTV(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log("Resp data:",respData);

  const prov_resp = await fetch(PROVIDERURL);
  const prov_respData = await prov_resp.json();

  console.log("provider Resp data:", prov_respData)
 
  buy_list = prov_respData.results.US.buy;
  flatrate_list = prov_respData.results.US.flatrate;
  console.log("buy list:", buy_list);``
  console.log("flatrate list:", flatrate_list);

  // Initialize services array.
  services = [];
  // Get streaming services from buy list.
  if(buy_list.length > 0)
  {
    for(i = 0; i < buy_list.length; i++)
    {
      services.push(buy_list[i].provider_name)
    }
  }
  console.log("Services afte`r buy_list:", services)

  if(flatrate_list.length > 0)
  {
    // Get streaming services from flat_list.
    for(i = 0; i < flatrate_list.length; i++)
    {
      services.push(flatrate_list[i].provider_name)
    }
  }
  console.log("Services after flatrate_list:", services)

  // Create the service provider string.
  service_string = ""
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
  console.log("Service string:", service_string)
  showTV(respData);
}

function showTV(movies) {
  // clear main
  main.innerHTML = "";

  const { poster_path, overview, genres, US, backdrop_path } = movies;
  var genre_string = "";
  console.log("Genres:",genres)
  for (i = 0; i < genres.length; i++) {
    if (i == genres.length - 1) {
      genre_string = genre_string + genres[i].name;
    } else {
      genre_string = genre_string + genres[i].name + ", ";
    }
  }

  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");

    movieEl.innerHTML = `
  <div class = "image-video">
          <div class="tv-image-window">
              <img class = "image" src="${IMGPATH + backdrop_path}">
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
  document.body.style.backgroundImage = "backdropIMG";
}*/
