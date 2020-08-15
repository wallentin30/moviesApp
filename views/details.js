const movieId = window.location.search.substring(4, 100).trim();
const renderMovie = new SingleMovie();

console.log("movie ID", movieId)

renderMovie.renderSingleMovieDetails(movieId, "single-movie-details", "recommended-movies", 4);

console.log("renderMovie", renderMovie)

// Delete button functionality
const deleteMovie = document.getElementById("single-movie-details");
const msgContainer = document.getElementById("messageAfterDeleteMovie");
const p = document.createElement("p");
p.innerHTML = "The Movie was deleted! There is no way to come back.";
p.style.display = "none";
// msgContainer.appendChild(p);

document.addEventListener('click', (event) => {
    if (event.target && event.target.id === "delete-btn") {
        if (isLoggedIn(event.target.innerHTML)) {
            console.log(event.target.innerHTML);
            
            event.preventDefault();
            const userConfirmation = confirm('Do you really want to delete this movie?');

            if (userConfirmation) {
                fetchApi.removeMovie(movieId, checkStatus);

                function checkStatus() {
                    p.style.display = "block";
                    p.style.textAlign = "center";
                    p.style.color = "#cc073c";
                    p.style.fontWeight = "800";
                    p.style.letterSpacing = "1px";
                    p.style.marginTop = "1.5rem";
                    deleteMovie.remove();
                    msgContainer.appendChild(p);
                }
            }
        }

        window.addEventListener("click", function (event) {
            if (event.target && event.target.id === "modal-close") {
                document.getElementById("modal").remove();
            }
        });

        window.onclick = function (event) {
            if (event.target.id === "modal") {
                modal.remove();
            }
        }
    }
});

// Edit button functionality
document.addEventListener('click', (event) => {
    if (event.target && event.target.id == 'edit-btn') {
        if (isLoggedIn(event.target.innerHTML)) {
            event.preventDefault();

            const editMovieForm = document.querySelector(".add-edit-form");
            if (!editMovieForm) {

                const movieDetails = {
                    title: document.querySelector("#movieTitle").innerText,
                    posterUrl: document.querySelector("#moviePoster").getAttribute("src"),
                    imdbRating: document.querySelector("#movieImdbRating").innerText,
                    year: document.querySelector("#movieYear").innerText,
                    country: document.querySelector("#movieCountry").innerText,
                    language: document.querySelector("#movieLanguage").innerText,
                    director: document.querySelector("#movieDirector").innerText,
                    runtime: document.querySelector("#movieRuntime").innerText,
                    genre: document.querySelector("#movieGenre").innerText,
                    plot: document.querySelector("#moviePlot").innerText,
                    cast: document.querySelector("#movieCast").innerText
                }

                renderMovie.renderAddAndEditForm('edit-movie-form', movieDetails);
                document.getElementById('edit-movie-form').style.height = "65rem";
                scroll(600, 600)

                //remove Edit form after Cancel button event
                document.querySelector(".cancel-movie-btn").addEventListener('click', (event) => {
                    event.preventDefault();
                    event.target.parentElement.parentElement.remove();
                    scroll(0, 0);
                })

                //event on Save button
                document.querySelector(".save-movie-btn").addEventListener('click', (event) => {
                    event.preventDefault();
                    saveEditChanges()
                })
            }
            else {
                document.getElementById('edit-movie-form').style.height = "0";
                editMovieForm.remove();
            }
        }

        window.addEventListener("click", function (event) {
            if (event.target && event.target.id === "modal-close") {
                document.getElementById("modal").remove();
            }
        });

        window.onclick = function (event) {
            if (event.target.id === "modal") {
                modal.remove();
            }
        }
    }
})

function saveEditChanges() {
    const movieForm = event.target.parentElement.parentElement;
    // console.log(movieForm)

    // new values from user
    const formImportedValues = updateMovieInDom(movieForm);

    //validate values
    validateInputs(formImportedValues);

    // convert new values to URLSearchparams
    if (formImportedValues.updatedMovieTitle.value !== "" &&
        formImportedValues.updatedMoviePoster.value !== "" &&
        formImportedValues.updatedMovieIMDb.value !== "" &&
        formImportedValues.updatedMovieYear.value !== "" &&
        formImportedValues.updatedMovieRuntime.value !== "" &&
        formImportedValues.updatedMovieGenre.value !== "" &&
        formImportedValues.updatedMovieDirector.value !== "" &&
        formImportedValues.updatedMovieCast.value !== "" &&
        formImportedValues.updatedMoviePlot.value !== "" &&
        formImportedValues.updatedMovieLanguage.value !== "" &&
        formImportedValues.updatedMovieCountry.value !== "") {
        const urlEncoded = new URLSearchParams();
        urlEncoded.append("Title", formImportedValues.updatedMovieTitle.value)
        urlEncoded.append("Poster", formImportedValues.updatedMoviePoster.value)
        urlEncoded.append("imdbRating", formImportedValues.updatedMovieIMDb.value)
        urlEncoded.append("Year", formImportedValues.updatedMovieYear.value)
        urlEncoded.append("Runtime", formImportedValues.updatedMovieRuntime.value)
        urlEncoded.append("Genre", formImportedValues.updatedMovieGenre.value)
        urlEncoded.append("Director", formImportedValues.updatedMovieDirector.value)
        urlEncoded.append("Actors", formImportedValues.updatedMovieCast.value)
        urlEncoded.append("Plot", formImportedValues.updatedMoviePlot.value)
        urlEncoded.append("Language", formImportedValues.updatedMovieLanguage.value)
        urlEncoded.append("Country", formImportedValues.updatedMovieCountry.value)

        //Fetch api EDIT movie
        fetchApi.editMovie(movieId, urlEncoded).then((response) => {
            if (response.ok) {
                movieForm.parentElement.parentElement.querySelector("#movieTitle").innerHTML = formImportedValues.updatedMovieTitle.value;
                movieForm.parentElement.parentElement.querySelector("#moviePoster").src = formImportedValues.updatedMoviePoster.value;
                movieForm.parentElement.parentElement.querySelector("#movieImdbRating").innerHTML = formImportedValues.updatedMovieIMDb.value;
                movieForm.parentElement.parentElement.querySelector("#movieYear").innerHTML = formImportedValues.updatedMovieYear.value;
                movieForm.parentElement.parentElement.querySelector("#movieCountry").innerHTML = formImportedValues.updatedMovieCountry.value;
                movieForm.parentElement.parentElement.querySelector("#movieLanguage").innerHTML = formImportedValues.updatedMovieLanguage.value;
                movieForm.parentElement.parentElement.querySelector("#movieDirector").innerHTML = formImportedValues.updatedMovieDirector.value;
                movieForm.parentElement.parentElement.querySelector("#movieRuntime").innerHTML = formImportedValues.updatedMovieRuntime.value;
                movieForm.parentElement.parentElement.querySelector("#movieGenre").innerHTML = formImportedValues.updatedMovieGenre.value;
                movieForm.parentElement.parentElement.querySelector("#moviePlot").innerHTML = formImportedValues.updatedMoviePlot.value;
                movieForm.parentElement.parentElement.querySelector("#movieCast").innerHTML = formImportedValues.updatedMovieCast.value;

                //Remove Form from dom after save changes button event
                movieForm.remove();
                //jump on top of the page
                scroll(0, 0);
            } else if (response.status == 400) {
                alert("Please edit something!")
            }
        });
    }

}

//getting new values from user
function updateMovieInDom(movieForm) {
    const editedMovieValues = {
        updatedMovieTitle: movieForm.querySelector('#movie-title'),
        updatedMoviePoster: movieForm.querySelector('#movie-poster'),
        updatedMovieIMDb: movieForm.querySelector('#movie-imdbRating'),
        updatedMovieYear: movieForm.querySelector('#movie-year'),
        updatedMovieCountry: movieForm.querySelector('#movie-country'),
        updatedMovieLanguage: movieForm.querySelector('#movie-language'),
        updatedMovieDirector: movieForm.querySelector('#movie-director'),
        updatedMovieRuntime: movieForm.querySelector('#movie-runtime'),
        updatedMovieGenre: movieForm.querySelector('#movie-genre'),
        updatedMoviePlot: movieForm.querySelector('#movie-plot'),
        updatedMovieCast: movieForm.querySelector('#movie-cast'),
    }

    return editedMovieValues;
}

function validateInputs(obj) {
    const values = Object.values(obj);

    for (let i = 0; i < values.length; i++) {
        validateFormElement(values[i]);
    }
}

function validateFormElement(inputElement) {
    if (inputElement.value === "") {
        inputElement.style.border = "2px solid #cc073c"
    }
    else {
        inputElement.style.border = "1px solid rgb(162, 162, 162)"
    }
}

//STICKY NAVBAR CODE
window.onscroll = function () {
    scrollPage();
};

const header = document.getElementById("header");
const header_two = document.querySelector(".header_two");

const sticky = header.offsetTop;
;

// movie-triler button 

document.addEventListener('click', (event) => {
    if (event.target && event.target.id === "trailer-btn") {
        if (isLoggedIn(event.target.innerHTML)) {
            event.preventDefault();
            console.log("se va afisa filmul")
            movieTrailer();
            window.onclick = function (event) {
                if (event.target.id === "single-movie-details" || event.target.id === "movie-trailer-container") {
                    document.getElementById("videoContainer").remove();
                }
            }
        }
        window.addEventListener("click", function (event) {
            if (event.target && event.target.id === "modal-close") {
                document.getElementById("modal").remove();
            }
        });
    }

});

