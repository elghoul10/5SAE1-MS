var scrollPos = 0;

// navigation element
var navigation = document.querySelector(".navigation");

// adding scroll event
window.addEventListener("scroll", function () {
  // detects new state and compares it with the new one
  if (document.body.getBoundingClientRect().top == 0) {
    navigation.classList.add("navigation-scrolled-header");
    navigation.classList.remove("navigation-scrolled-up");
    navigation.classList.remove("navigation-scrolled-down");
  } else if (document.body.getBoundingClientRect().top > scrollPos) {
    //UP
    navigation.classList.add("navigation-scrolled-up");
    navigation.classList.remove("navigation-scrolled-header");
    navigation.classList.remove("navigation-scrolled-down");
  } else {
    //DOWN
    navigation.classList.add("navigation-scrolled-down");
    navigation.classList.remove("navigation-scrolled-header");
    navigation.classList.remove("navigation-scrolled-up");
  }
  // saves the new position for iteration.
  scrollPos = document.body.getBoundingClientRect().top;
});
