console.log("in home");
//top-rated

const getHomepageMovies = new ListsMovies("top-rated", 100);
//top-rated
getHomepageMovies.renderTopRatedMovies();
//action
const getActionMovies = new ListsMovies("action", 4);
getActionMovies.renderMovieByGenre("Action");
//comedy
const getComedyMovies = new ListsMovies("comedy", 4);
getComedyMovies.renderMovieByGenre("Comedy");
//drama
const getDramaMovies = new ListsMovies("drama", 4);
getDramaMovies.renderMovieByGenre("Drama");
//horror
const getHorrorMovies = new ListsMovies("horror", 4);
getHorrorMovies.renderMovieByGenre("Horror");

//STICKY NAVBAR CODE
window.onscroll = function() {
    scrollPage();
};

const header = document.getElementById("header");
const header_two = document.querySelector(".header_two");

const sticky = header.offsetTop;

