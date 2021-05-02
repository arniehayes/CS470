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

// Create map with streaming website links.
stream_links = new Map();
stream_links.set("Apple iTunes", "https://www.apple.com/itunes/");
stream_links.set("Peacock", "https://www.peacocktv.com/");
stream_links.set("Peacock Premium", "https://www.peacocktv.com/");
stream_links.set("Microsoft Store", "https://www.microsoft.com/en-us?ql=1&spl=1");
stream_links.set("DIRECTV", "https://www.directv.com/");
stream_links.set("Disney Plus", "https://www.disneyplus.com/");
stream_links.set("Netflix", "https://www.netflix.com/");
stream_links.set("Boomerang", "https://www.boomerang.com/");
stream_links.set("Cartoon Network", "https://www.cartoonnetwork.com/index.html?atclk_gn=un_homeImg");
stream_links.set("Sling TV", "https://www.sling.com/");
stream_links.set("HBO Max", "https://www.hbomax.com/");
stream_links.set("Vudu", "https://www.vudu.com/");
stream_links.set("Hulu", "https://www.hulu.com/");
stream_links.set("FandangoNOW", "https://www.fandangonow.com/");
stream_links.set("fuboTV", "https://www.fubo.tv/welcome");
stream_links.set("Redbox", "https://www.redbox.com/");
stream_links.set("Amazon Prime Video", "https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011");
stream_links.set("Google Play Movies", "https://play.google.com/store");
stream_links.set("Amazon Video", "https://www.amazon.com/Prime-Video/b?node=2676882011");
stream_links.set("Paramount Plus", "https://www.paramountplus.com/?gclsrc=aw.ds&&ref=__iv_p_1_g_115989849984_w_kwd-934663795095_h_9032097_ii__d_c_v__n_g_c_511416537354_l__t__e__r__vi__&ftag=PPM-02-10ade4f&vndid=google$null$null$paramount%20plus&gclid=CjwKCAjwm7mEBhBsEiwA_of-TFcqSlfEFO6qqcz5hTl-4sZEEKZG8p-nh-c5_NuQsdsl7ue1gK7m6hoCpJ0QAvD_BwE&gclsrc=aw.ds&_ivgu=9e048606-ad16-4a55-9a12-29e6a0ea123b");
stream_links.set("CBS", "https://www.cbs.com/");
stream_links.set("Nickhits Amazon Channel", "https://www.amazon.com/gp/video/storefront/ref=DVM_PDS_GOO_US_AC_C_A_AMb_1_NHITS%7Cm_qRcbtb94c_c329251977971?benefitId=nickhits&benefitID=nickhits&node=2858778011");
stream_links.set("Netflix Kids", "https://www.netflix.com/");
stream_links.set("Spectrum On Demand", "https://ondemand.spectrum.net/");
stream_links.set("Hoopla", "https://www.hoopladigital.com/");
stream_links.set("AMC on Demand", "https://www.amcplus.com/get-started?utm_medium=sem&utm_source=google&utm_campaign=amc-plus&gclid=CjwKCAjwm7mEBhBsEiwA_of-TO4J0wqihem7IKoo_8bXav3fOgtbnpeEC52e0J8Pid1-x5BeF1_PSBoCTuQQAvD_BwE");
stream_links.set("YouTube", "https://www.youtube.com/");


getTV(APIURL);

async function getTV(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log("Resp data:",respData);

  const prov_resp = await fetch(PROVIDERURL);
  const prov_respData = await prov_resp.json();

  // Initialize services array.
  services = [];
  // Initialize service logo array.
  service_logos = [];
  // Initialize service links array.
  service_links = [];
  if(typeof(prov_respData.results.US) === "undefined")
  {
    service_string = "Unknown"
  }
  else
    {
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

    if(services.length > 0)
    {
      // Get rid of duplicates
      services = [...new Set(services)];
      for(i = 0; i < services.length; i++)
      {
        for(i = 0; i < services.length; i++)
        {
          service_links.push(stream_links.get(services[i]));
        }
        console.log("Service links:", service_links);
      }
    }
  }
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
              <h1 class = "sect-name">Genre</h1>
              <div class="border">
                <div class="genre-card">             
                  <div class=""></div>
                  <p class = "card-text genre-service-text">${genre_string}</p>
                </div>
              </div>
          </div>
          <div class= "service-container">
            <h1 class = "sect-name">Streaming Service</h1>
            <div class="border">
              <div id = "service-card" class="service-card">             
                  `;
                main.appendChild(movieEl);
                service_card = document.getElementById("service-card")
                console.log(service_card)
                console.log("ser_log", service_logos)
                if(service_logos.length == 0)
                {
                  img_obj = document.createElement("img");
                  img_obj.setAttribute("src", "Images/no-entry.png");
                  img_obj.setAttribute("alt", "No streaming service available");
                  img_obj.classList.add("stream-icon");
                  service_card.appendChild(img_obj)
                }
                else
                {
                  for(i = 0; i < service_logos.length; i++)
                  {
                    // Create href that can be clicked if there is a valid link.
                    if(typeof(service_links[i]) != "undefined")
                    {
                      a_element = document.createElement("a");
                      a_element.href = service_links[i]
                      // Create logo image and add it
                      img_src = "https://image.tmdb.org/t/p/original" + service_logos[i];
                      alternative = services[i];
                      img_obj = document.createElement("img");
                      img_obj.setAttribute("src", img_src);
                      img_obj.setAttribute("alt", alternative);
                      img_obj.classList.add("stream-icon");
                      a_element.appendChild(img_obj);
                      service_card.appendChild(a_element);
                    } 
                    else
                    {
                      // Create logo image and add it
                      img_src = "https://image.tmdb.org/t/p/original" + service_logos[i];
                      alternative = services[i];
                      img_obj = document.createElement("img");
                      img_obj.setAttribute("src", img_src);
                      img_obj.setAttribute("alt", alternative);
                      img_obj.classList.add("stream-icon");
                      service_card.appendChild(img_obj);
                    }
                  }
                }
                  movieEl.innerHTML +=
                  `
          </div>
          </div>
      </div>
      <div class = "description">
        <h1 class = "sect-name">Description</h1>
        <div class="border">
          <div class="card">        
            <p class = "card-text">${overview}</p>
          </div>
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