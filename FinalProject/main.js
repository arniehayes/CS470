// Main js functions

let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.themoviedb.org/3/movie/12?api_key=94f2d3081ba573d2f171f0f8020eb38a"
);
request.send();
request.onload = () => {
  console.log(request);
  if (request.status === 200) {
      var obj = JSON.parse(request.response);
    const img = document.createElement('img');
    document.getElementById("main-img").innerHTML = obj.backdrop_path;
    //document.getElementById("description").innerHTML = "" + obj.;
    //document.getElementById("rating").innerHTML = "" + obj.;
    console.log(JSON.parse(request.response));
  } else {
    console.log(`error ${request.status} ${request.statusText}`);
  }
};



// Search
var form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = form.querySelector("input[type=search]");
  search.value = "site:css-tricks.com " + search.value;
  form.submit();
});