function getValuesFromForm() {
    const valuesFromForm = {};
    const formElems = document.querySelectorAll('.add-edit-form [name]');
    formElems.forEach(elem => {
        valuesFromForm[elem.name] = elem;
    });

    return valuesFromForm;
}

function validateInputs(obj) {
    const values = Object.values(obj);

    for (let i = 0; i < values.length; i++) {
        !validateFormElement(values[i])
    }
}

function validateFormElement(inputElement) {
    if (inputElement.value === "") {
        inputElement.classList.add('error');
    }
    else {
        inputElement.classList.remove('error');
    }
}

function createMovieInDB() {
    const valuesFromFormLocal = getValuesFromForm();
    validateInputs(valuesFromFormLocal);

    let check = true;
    Object.values(valuesFromFormLocal).forEach(elem => {
        if (elem.value === "") check = false;
    });

    if (check) {

        const newMovie = Object.assign({}, valuesFromFormLocal);
        Object.keys(newMovie).forEach(elem => {
            newMovie[elem] = newMovie[elem].value;
        });

        // console.log(newMovie)

        fetchApi.addMovie(newMovie).then((response) => {
            console.log(response);
            if (response.ok) {
                document.querySelector('.add-edit-form').remove();
                if (document.querySelector('.moviePreview'))
                    document.querySelector('.moviePreview').remove();

                const msgContainer = document.getElementById('add-movie-form');
                msgContainer.classList.remove('change-height', 'additional-height');
                msgContainer.classList.add('message-container');

                const p = document.createElement("p");
                p.innerHTML = "Movie successfully added.";
                p.classList.add('add-movie-message');
                msgContainer.appendChild(p);

                scroll(0,0);
            }
        });
    }
}

function initCreateMovie() {
    const container = document.getElementById("add-movie-form");
    const addMovieForm = document.querySelector(".add-edit-form");
    const movieForm = new SingleMovie();

    if (!addMovieForm) {
        const movieDetails = {
            title: "",
            posterUrl: "",
            imdbRating: "",
            year: "",
            country: "",
            language: "",
            director: "",
            runtime: "",
            genre: "",
            plot: "",
            cast: ""
        }

        movieForm.renderAddAndEditForm("add-movie-form", movieDetails);
        container.classList.add('change-height');
        displayPreviewBtn();

        document.querySelector(".cancel-movie-btn").addEventListener('click', (event) => {
            event.preventDefault();
            container.classList.remove('change-height', 'additional-height');
            event.target.parentElement.parentElement.remove();
            if (document.querySelector(".moviePreview"))
                document.querySelector(".moviePreview").remove();
            scroll(0,0);
        })

        document.querySelector(".save-movie-btn").addEventListener('click', (event) => {
            event.preventDefault();
            createMovieInDB()
        })
        
        document.querySelector(".preview-movie-btn").addEventListener('click', (event) => {
            event.preventDefault();
            const container = document.getElementById("add-movie-form");
            previewNewMovie(container);
        })
    }
    else {
        container.classList.remove('change-height', 'additional-height');
        addMovieForm.remove();
        if (document.querySelector(".moviePreview"))
            document.querySelector(".moviePreview").remove();
        scroll (0,0);
    }
}

function displayPreviewBtn() {
    const containter = document.querySelector(".form-btn");
    const previewBtn = document.createElement("button");
    previewBtn.setAttribute("class", "preview-movie-btn");
    previewBtn.innerText = "Preview";
    containter.appendChild(previewBtn);
}

function previewNewMovie(container) { 
    const moviePreviewContainer = document.querySelector(".moviePreview");

    const moviePreview = {
        Poster: document.getElementById("movie-poster"),
        Title: document.getElementById("movie-title"),
        Year: document.getElementById("movie-year"),
        imdbRating: document.getElementById("movie-imdbRating"),
        Genre: document.getElementById("movie-genre")
    }

    validateInputs(moviePreview);

    if (!moviePreviewContainer &&
        moviePreview.Poster.value !== "" &&
        moviePreview.Title.value !== "" &&
        moviePreview.Year.value !== "" &&
        moviePreview.imdbRating.value !== "" &&
        moviePreview.Genre.value !== "") {

            container.classList.add('additional-height');

            const movieForm = new SingleMovie();
            movieForm.renderMoviePreview("add-movie-form", moviePreview);        
    }
    else if (moviePreviewContainer) {
        moviePreviewContainer.remove();
        container.classList.remove('additional-height');
    }
}

function isLoggedIn(content) {
    if (localStorage.getItem("authenticated")) {
        return true;
    } else {
        const modalContainer = document.querySelector(".main-container");
        const modal = document.createElement("div");
        modal.setAttribute("id", "modal");
        modal.setAttribute("class", "modal");
        modal.innerHTML = `<div class="modal-content">
                                <p>Please log in to use ${content}!</p>
                                <i id="modal-close" class="fas fa-times modal-close"></i>
                            </div>`;
        modalContainer.appendChild(modal);

        return false;
    }
}

function addMovie() {
    const addMovieBtn = document.getElementById("add-btn");
    addMovieBtn.addEventListener('click', event => {
        if (isLoggedIn(event.target.innerHTML)) {
            event.preventDefault();
            initCreateMovie();
        }
    });

    window.addEventListener("click", function(event) {
        if (event.target && event.target.id === "modal-close") {
            document.getElementById("modal").remove();
        }
    });

    window.onclick = function(event) {
        if (event.target.id === "modal") {
            modal.remove();
        }
    }
}
