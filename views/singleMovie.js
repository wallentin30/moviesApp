class SingleMovie {
    constructor(obj) {
        this.movie = obj;
    }

    renderSingleMovie(htmlcontainer) {
        if (this.movie) {
            // console.log("in renderSingleMovie");
            const movieContainer = document.createElement("div");
            movieContainer.setAttribute("class", "movieContainer");
            //  console.log(this.movie)
            movieContainer.innerHTML = `<a href="./details.html?id=${this.movie._id}">
            <div id=${this.movie._id} >
                <div class="movieDetails">
                    <img class="Poster" src=${this.movie.Poster} >  
                    <div class="details_bg-color">
                        <h4 class="Title"> ${this.movie.Title} </h4>
                        <div class="movies_year-rating">
                            <p class="Year">${this.movie.Year}</p>
                            <p class="imdbRating" ><i class="fa fa-star"></i> ${this.movie.imdbRating}</p>
                        </div>
                        <p class="Genre"> ${this.movie.Genre} </p>
                    </div>
                </div>
            </div>
        </a>`;
            // console.log("htmlcontainer " + htmlcontainer);
            // console.log("moviecontainer" + movieContainer)
            document.getElementById(htmlcontainer).appendChild(movieContainer);
            // console.log(htmlcontainer)
        }
    }

    renderSingleMovieDetails(movieId, selector, relatedMoviesSelector, relatedMoviesCount) {
        fetchApi.getMovieById(movieId).then((response) => {
            console.log("raspuns:", response);
            const rendeSingleMovieDetails = new SingleMovie(response);

            console.log("rendeSingleMovieDetails", rendeSingleMovieDetails)

            rendeSingleMovieDetails.renderDetails(selector);
            const renderRecomanded = new ListsMovies(relatedMoviesSelector, relatedMoviesCount);
            console.log(renderRecomanded)
            renderRecomanded.renderRecommendedMovies(response.Genre);
        });
    }

    renderDetails(htmlcontainer) {
        // console.log("in renderSingleMovie");

        const movieContainer = document.createElement("div");
        movieContainer.setAttribute("id", this.movie._id);
        movieContainer.setAttribute("class", "movie-details-container");
        movieContainer.innerHTML = `
            <section class="details-bar">
                <h3 id="movieTitle">${this.movie.Title}</h3>
                <button id="edit-btn">Edit movie</button>
            </section>
            <section class="details-content">
                <img id="moviePoster" src="${this.movie.Poster}" />
                <section class="details-movie">
                    <div>
                        <p class="info">Info</p>
                    </div>
                    <div class="movie-info">
                        <div class="left">
                            <p>IMDb</p>
                            <p>year</p>
                            <p>country</p>
                            <p>language</p>
                            <p>director</p>
                            <p>runtime</p>
                            <p>genre</p>
                        </div>
                        <div class="right">
                            <p id="movieImdbRating">${this.movie.imdbRating}</p>
                            <p id="movieYear">${this.movie.Year}</p>
                            <p id="movieCountry">${this.movie.Country}</p>
                            <p id="movieLanguage">${this.movie.Language}</p>
                            <p id="movieDirector">${this.movie.Director}</p>
                            <p id="movieRuntime">${this.movie.Runtime}</p>
                            <p id="movieGenre">${this.movie.Genre}</p>
                        </div>
                    </div>
                    <section class="movie-description">
                        <p class="plot">plot</p>
                        <p id="moviePlot">${this.movie.Plot}</p>
                        <p class="cast">cast</p>
                        <p id="movieCast">${this.movie.Actors}</p>
                    </section>
                </section>
            </section>
            <div>
                <button id="delete-btn">Delete Movie</button>
                <button id="trailer-btn">Trailer ${this.movie.Title}</button>

            </div>
            <div id="movie-trailer-container"></div>`;
        // console.log("htmlcontainer " + htmlcontainer);
        // console.log("moviecontainer"+movieContainer)
        document.getElementById(htmlcontainer).appendChild(movieContainer);
        // console.log(htmlcontainer)
    }

    renderAddAndEditForm(htmlcontainer, movie) {
        const movieElement = document.createElement("form");
        movieElement.setAttribute("class", "add-edit-form");
        movieElement.innerHTML = `<p>Insert Movie details below</p>
                <label for="movie-title">Title</label>
                <input type="text" name="Title" id="movie-title" value="${movie.title}"/>
                <label for="movie-poster">Poster</label>
                <input type="text" name="Poster" id="movie-poster" value="${movie.posterUrl}"/>
                <label for="movie-imdbRating">IMDb</label>
                <input type="text" name="imdbRating" id="movie-imdbRating" value="${movie.imdbRating}"/>
                <label for="movie-year">Year</label>
                <input type="text" name="Year" id="movie-year" value="${movie.year}"/>
                <label for="movie-country">Country</label>
                <input type="text" name="Country" id="movie-country" value="${movie.country}"/>
                <label for="movie-language">Language</label>
                <input type="text" name="Language" id="movie-language" value="${movie.language}"/>
                <label for="movie-director">Director</label>
                <input type="text" name="Director" id="movie-director" value="${movie.director}"/>
                <label for="movie-runtime">Runtime</label>
                <input type="text" name="Runtime" id="movie-runtime" value="${movie.runtime}"/>
                <label for="movie-genre">Genre</label>
                <input type="text" name="Genre" id="movie-genre" value="${movie.genre}"/>
                <label for="movie-plot">Plot</label>
                <textarea name="Plot" id="movie-plot">${movie.plot}</textarea>
                <label for="movie-cast">Cast</label>
                <input type="text" name="Actors" id="movie-cast" value="${movie.cast}"/>
                <div class="form-btn">
                    <button class="save-movie-btn">Save</button>
                    <button class="cancel-movie-btn">Cancel</button>
                </div>`;
        document.getElementById(htmlcontainer).appendChild(movieElement);
    }

    renderMoviePreview(htmlcontainer, movie) {
        const movieContainer = document.createElement("div");
        movieContainer.setAttribute("class", "moviePreview");
        movieContainer.innerHTML =
            `<div class="movieContainer">
                <div class="movieDetails">
                    <img class="Poster" src=${movie.Poster.value} >  
                    <div class="details_bg-color">
                        <h4 class="Title"> ${movie.Title.value} </h4>
                        <div class="movies_year-rating">
                            <p class="Year">${movie.Year.value}</p>
                            <p class="imdbRating" ><i class="fa fa-star"></i> ${movie.imdbRating.value}</p>
                        </div>
                        <p class="Genre"> ${movie.Genre.value} </p>
                    </div>
                </div>
            </div>`;
        document.getElementById(htmlcontainer).appendChild(movieContainer);
    }
}