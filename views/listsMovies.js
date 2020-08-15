class ListsMovies {
    constructor(selector, take) {
        if (selector) {
            this.selector = selector
        }

        this.take = take
    }

    renderMovieByGenre(genre) {
        const query = {
            take: this.take,
            Genre: genre
        }
        fetchApi.getFilteredMovieList(query).then((response) => {
            //    console.log(response)
            for (let i = 0; i < response.results.length; i++) {
                //console.log(response.results[i])
                const rendeSingleMovie = new SingleMovie(response.results[i]);
                rendeSingleMovie.renderSingleMovie(this.selector);
            }
        });
    }


    createPagination(paginationObj, container) {

        //console.log(paginationObj);
        document.getElementById(container + "-pagination").innerHTML = "";
        const prevPage = document.createElement('a');
        prevPage.innerHTML = '<i class="fas fa-arrow-left"></i>';
        prevPage.onclick = () => {
            if (paginationObj.links.prev !== null) {
                this.renderMovies("", container, paginationObj.links.prev)
            }
        }
        document.getElementById(container + "-pagination").appendChild(prevPage);
        const selfPage = document.createElement('a');
        selfPage.innerText = paginationObj.currentPage;
        selfPage.onclick = () => {
            this.renderMovies("", container, paginationObj.links.self)
        }
        document.getElementById(container + "-pagination").appendChild(selfPage);
        const nextPage = document.createElement('a');
        nextPage.innerHTML = '<i class="fas fa-arrow-right"></i>'
        nextPage.onclick = () => {
            if (paginationObj.links.next !== null) {
                this.renderMovies("", container, paginationObj.links.next)
            }
        }
        document.getElementById(container + "-pagination").appendChild(nextPage);
    }

    renderMovieByType = (type) => {
        let query = {
            take: this.take,
            Type: type
        }
        this.renderMovies(query)
    };

    renderMovies(filter, filterValue, url) {

        let query = {
            take: this.take,
        }
        if (filter !== "string") {
            query = {...query, ...filter }
        } else {
            query[filter] = filterValue
        }
        fetchApi.getFilteredMovieList(query, url).then((response) => {
            console.log(response)
            document.getElementById(this.selector).innerHTML = ""
            for (let i = 0; i < response.results.length; i++) {
                const allMovies = new SingleMovie(response.results[i])
                allMovies.renderSingleMovie(this.selector)
                console.log(this.selector)
            }
            this.createPagination(response.pagination, this.selector)
        })
    }

    searchByTitle = (searchTitle) => {
        let query = {
            take: this.take,
            Title: searchTitle,
        };
        this.renderMovies(query)
    }

    renderRecommendedMovies(genres) {
        let genre;
        if (genres.indexOf(",") >= 0) {
            genre = genres.split(",")[0].trim();
        } else {
            genre = genres;
        }

        const query = {
            Genre: genre,
        };
        fetchApi
            .getFilteredMovieList(query).then((response) => {
                // console.log(response)
                const sortedMovies = response.results.sort((a, b) => b.Year - a.Year);
                // console.log(sortedMovies)
                let index = 0;
                while (index < this.take && index < sortedMovies.length) {
                    const rendeSingleMovie = new SingleMovie(sortedMovies[index]);
                    rendeSingleMovie.renderSingleMovie(this.selector);
                    index++;
                }
            });
    }



    filter = (params) => {

        const movieType = document.getElementById('movie-type').value;
        let query = {
            take: this.take,
            Type: movieType
        }
        if (params.searchText) {
            const field = document.getElementById('movie-options').value;
            console.log(field)
            query[field] = params.searchText
        } else if (params.value && params.value !== 'all') {
            query[params.field] = params.value;
        }
        this.renderMovies(query)
    }


    renderTopRatedMovies() {
        const query = {
            take: this.take,

        }
        fetchApi.getFilteredMovieList(query).then((response) => {
            console.log(response)
            let count = 0
            for (let i = 0; i < response.results.length; i++) {
                console.log(response.results[i])
                if (response.results[i].imdbRating > 8) {
                    count++
                    console.log(response.results[i].imdbRating)
                        //  arrayOfMovies.push(response.results[i])

                    const rendeSingleMovie = new SingleMovie(response.results[i]);
                    rendeSingleMovie.renderSingleMovie(this.selector);
                    // console.log(arrayOfMovies)
                }
                if (count === 8)
                    break
            }
        });
    }


}