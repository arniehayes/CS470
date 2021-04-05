/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowAnswer1() {
  document.getElementById("myDropdown1").classList.toggle("show");
}

function ShowAnswer2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

function ShowAnswer3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.question')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}