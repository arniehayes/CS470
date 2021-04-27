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

setResult()

// Check for excluded genres.
function isExcluded(ID)
{
  if(ID == 27 || ID == 99 || ID == 80 || ID == 18 || ID == 10764)
  {
    return true
  }
  return false
}

// Check for included genres.
function isIncluded(ID)
{
  if(ID == 10751 || ID == 10762)
  {
    return true
  }
  return false
}

// Display the search query that the user input.
function setResult()
{
  const element = document.createElement("div");
    h3 = document.createElement("h3");
    h3.classList.add("page-name")
    searchTerm = localStorage.getItem("lookup");
    h3.textContent = "search result for \"" + searchTerm +"\"";
    element.appendChild(h3)
    document.body.appendChild(element)
}

if (localStorage.getItem("lookup")) {
    main.innerHTML = "";
    for (var i = 1; i < 100; i++) {
      getMovies(SEARCHAPI1 + i + SEARCHAPI2 + localStorage.getItem("lookup"));
      getTV(TVSEARCHAPI1 + i + SEARCHAPI2 + localStorage.getItem("lookup"));
    }
    search.value = "";
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
    var rating = false;
    const { poster_path, name, id, genre_ids, overview, origin_country} = show;
    if(origin_country.length > 0)
    {
      for(i = 0; i < origin_country.length; i++)
      {
        if(origin_country[i] === "US")
        {
          inUS = true;
          break;
        }
      }
    }
    if(inUS == true)
    {
    if(typeof(genre_ids) != "undefined")
    {
      for (var i = 0; i < genre_ids.length - 1; i++) 
      {
        // Check for invalid genres.
        if (isExcluded(genre_ids[i]) == true) {
          rating = false;
          break;
        }
        // Check for valid genres.
        if (isIncluded(genre_ids[i]) == true) 
        {
          rating = true;
        }
      }
    }
    if (rating) {
      // Making sure the file is not corrupted
      if (poster_path != null && name != null && overview != "") {
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
  }
  });
}

function showMovies(movies) {
  // clear main
  //main.innerHTML = "";

  movies.forEach((movie) => {
    var rating = false;
    const {genre_ids} = movie
    if(typeof(genre_ids) != "undefined")
    {
      for (var i = 0; i < genre_ids.length - 1; i++)
      {
        // Check for invalid genres.
        if (isExcluded(genre_ids[i]) == true) {
          rating = false;
          break;
        }
        // Check for valid genres.
        if (isIncluded(genre_ids[i]) == true) 
        {
          rating = true;
        }
      }
    }
    if (rating) {
      // Making sure the file is not corrupted
      const { poster_path, title, overview, id, release_date, original_language} = movie;
      if (poster_path != null && title != null && original_language === "en") {
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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    localStorage.setItem("lookup", searchTerm);
    window.location.href = "results.html";
  });