//window.onload = localStorage.getItem("storageName");

const APIURL =
  "https://api.themoviedb.org/3/movie/" +
  localStorage.getItem("storageName") +
  "?api_key=94f2d3081ba573d2f171f0f8020eb38a";
IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=94f2d3081ba573d2f171f0f8020eb38a&query=";
youtube_key = "AIzaSyARkx4oX8mCmYJlyECthg1UMrOZKXJy5E8";
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
  youtube_search = youtube_search.replaceAll(" ", "+");
  console.log("Search:", youtube_search)
  APIsearch =  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&videoSyndicated=any&q=" + youtube_search + "&key=" + youtube_key;

  const y_resp = await fetch(APIsearch);
  const y_respData = await y_resp.json();
  console.log("YouTube API return:",y_respData);
  chosen_vid_id = "";
  // Check through each result of the youtube search in order to get the trailer
  youtube_results = y_respData.items;
  console.log("Youtube Video results:", youtube_results)
  for(i = 0; i < youtube_results.length; i++)
  {
    // Check if the video has the word "trailer" in it
    lowercaseTitle = youtube_results[i].snippet.title.toLowerCase();
    console.log("Title searched:", lowercaseTitle)
    if(lowercaseTitle.includes("trailer") == true)
    {
      console.log("Chosen title:", youtube_results[i].snippet.title)
      chosen_vid_id = youtube_results[i].id.videoId;
      break;
    }
  }
  // If there was no match just grab the first video on the search result.
  if(chosen_vid_id === "")
  {
    chosen_vid_id = youtube_results[0].id.videoId;
  }

  // Construct Youtube video URL
  youtube_url = "https://www.youtube.com/embed/" + chosen_vid_id;
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
    // Initialize servie logo array.
    service_logos = [];
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
          service_logos.push(buy_list[i].logo_path)
        }
      }
      console.log("Services after buy_list:", services)
      console.log("Service logos buy_list:", service_logos)
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
          service_logos.push(flatrate_list[i].logo_path)
        }
      }
      console.log("Services after flatrate_list:", services)
      console.log("Service logos flatrate_list:", service_logos)
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
              <h1 class = "sect-name">Genre</h1>
              <div class="genre-card">             
                  <div class=""></div>
                  <p class = "card-text genre-service-text">${genre_string}</p>
                </div>

                <div class= "service-container">
              <h1 class = "sect-name">Streaming Service</h1>
              <div id = "service-card" class="service-card">             
                  `;
                main.appendChild(movieEl);
                service_card = document.getElementById("service-card")
                console.log(service_card)
                if(typeof(services_logos) != "undefined")
                {
                  for(i = 0; i < service_logos.length; i++)
                  {
                    img_src = "https://image.tmdb.org/t/p/original" + service_logos[i];
                    alternative = services[i];
                    img_obj = document.createElement("img");
                    img_obj.setAttribute("src", img_src);
                    img_obj.setAttribute("alt", alternative);
                    img_obj.classList.add("stream-icon");
                    service_card.appendChild(img_obj)
                  }
                }
                  movieEl.innerHTML +=
                  `


      <div class = "description">
              <h1 class = "sect-name">Description</h1>
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
  localStorage.setItem("lookup", searchTerm)
  window.location.href = "results.html"
});