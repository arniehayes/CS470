TVAPI =
  "https://api.themoviedb.org/3/discover/tv?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=10762&include_null_first_air_dates=false";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/tv?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";
  SEARCHAPI1 =
    "https://api.themoviedb.org/3/search/multi?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&page=";

  SEARCHAPI2 = "&include_adult=false&query=";

  TVSEARCHAPI1 =
  "https://api.themoviedb.org/3/search/tv?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&page=";
    
  TVAPI1 =
    "https://api.themoviedb.org/3/discover/tv?api_key=94f2d3081ba573d2f171f0f8020eb38a&language=en-US&sort_by=popularity.desc&page=";

  TVAPI2 =
    "&timezone=America%2FNew_York&with_genres=10762";

  TVAPI3 = 
    "&include_null_first_air_dates=false";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

serviceid = 0;
genreid = 0;

function searchTV(){
    servicetag = "";
    genretag = "";
    if(serviceid)
        servicetag = "&with_watch_providers=" + serviceid + "&watch_region=US";
    if(genreid)
        genretag = "," + genreid;
    for (i = 1; i < 50; i++) {
        getTV(TVAPI1 + i + TVAPI2 + genretag + TVAPI3 + servicetag);
    }
}

// initially get fav TV shows
searchTV();


async function getTV(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  //console.log(respData);

  showTV(respData.results);
}
function showTV(TV) {
  TV.forEach((show) => {
    // Checking if the rating is family: 10762 or child: 10751
    var rating = false;
    const { poster_path, name, id, genre_ids, overview, original_language, origin_country} = show;  
    inUS = false;
    // Check to see if the origin country is in the US.
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
      for (var i = 0; i < genre_ids.length - 1; i++) {
        if (genre_ids[i] == 10762 || genre_ids[i] == 10751) {
          rating = true;
        }
      }
      // Check to see if the original language is English/US
      if (rating) {
        // Making sure the file is not corrupted and an overview exists
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
    main.innerHTML = "";
    for (var i = 1; i < 100; i++) {
      getSearchMovies(SEARCHAPI1 + i + SEARCHAPI2 + searchTerm);
      getTV(TVSEARCHAPI1 + i + SEARCHAPI2 + searchTerm);
    }
    search.value = "";
  }
});

function getID(clickedID, clickedTitle, clickedRelease) {
  localStorage.setItem("storageName", clickedID);
  localStorage.setItem("storageTitle", clickedTitle);
  // Splice the release date to get the year only.
  release = clickedRelease.slice(0, 4);
  localStorage.setItem("releaseYear", release);
}

function genreClick() {
  document.getElementById("genreDropdown").classList.toggle("show");
}

function servicesClick() {
  document.getElementById("servicesDropdown").classList.toggle("show");
}

function StreamingFilter(ID){
    main.innerHTML = "";
    serviceid = ID;
    if(!ID)
        document.getElementById("SSDrop").innerHTML = "Streaming Service";
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
    searchTV();
}

function GenreFilter(ID){
    main.innerHTML = "";
    genreid = ID;
    if(!ID){
        document.getElementById("GDrop").innerHTML = "Genre";
    }
    else if(ID == 10759)
        document.getElementById("GDrop").innerHTML = "Action and Adv.";
    else if(ID == 16)
        document.getElementById("GDrop").innerHTML = "Animation";
    else if(ID == 35)
        document.getElementById("GDrop").innerHTML = "Comedy";
    else if(ID == 9648)
        document.getElementById("GDrop").innerHTML = "Mystery";
    else
        document.getElementById("GDrop").innerHTML = "SciFi and Fantasy";
    searchTV();
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
  localStorage.setItem("lookup", searchTerm)
  window.location.href = "results.html"
});
