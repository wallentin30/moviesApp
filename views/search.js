//STICKY NAVBAR CODE
window.onscroll = function() {
    scrollPage();
};

const header = document.getElementById("header");
const header_two = document.querySelector(".header_two");

const sticky = header.offsetTop;

// SEARCH FUNCTIONALITY IN NAV BAR
const searchTitle = document.getElementById('search-title')

function showHideMovies() {
    if (searchTitle.value === "") {
        const allMovies = new ListsMovies("search", 8)
        console.log(allMovies)
        allMovies.renderMovies()

    }
}
showHideMovies()


searchTitle.addEventListener('keyup', function(e) {
    const searchResults = new ListsMovies("search", 8)
    searchResults.searchByTitle(searchTitle.value)

    showHideMovies()


})