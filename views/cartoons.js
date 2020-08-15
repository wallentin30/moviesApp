const getFilmspageMovies = new ListsMovies("cartoons", 8);
getFilmspageMovies.renderMovieByType("game");


//STICKY NAVBAR CODE
window.onscroll = function() {
    scrollPage();
};

const header = document.getElementById("header");
const header_two = document.querySelector(".header_two");

const sticky = header.offsetTop;


// CREATE MOVIE CODE

addMovie();


// SEARCH MOVIE CODE
const input = document.getElementById('search-input')

input.addEventListener('keyup', (e) => getFilmspageMovies.filter({ searchText: input.value }))

let selection = document.querySelector("select#movie-genre-options")

selection.addEventListener('change', () => {
    const selectedValue = selection.options[selection.selectedIndex].value
    getFilmspageMovies.filter({ field: 'Genre', value: selectedValue })
    console.log("genre", selectedValue)
})