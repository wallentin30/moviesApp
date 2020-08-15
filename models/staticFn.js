function scrollPage() {
    if (window.pageYOffset > sticky) {
      header.classList.add("stickyElement");
      header_two.style.color = "white";
    } else {
      header.classList.remove("stickyElement");
      header_two.style.color = "#cc073c";
    }
  }
  function movieTrailer() {
    fetchApi.getMovieById(movieId).then((response) => {
        console.log("imdbid");
        console.log(response.imdbID);
        const mainContainer = document.getElementById('movie-trailer-container');

        fetchApi.getIdForTrailer(response.imdbID).then((resp) =>{
        console.log("resp");
        console.log(resp);
        if (resp.movie_results.length==0){
            
        const modal = document.createElement("div");
        modal.setAttribute("id", "modal");
        modal.setAttribute("class", "modal");
        modal.innerHTML = `<div class="modal-content">
                                <p>Sorry ${response.Title} movie has no triller !</p>
                                <i id="modal-close" class="fas fa-times modal-close"></i>
                            </div>`;
                            mainContainer.appendChild(modal);
            console.log("no movie")
        }
else
{
            fetchApi.getMovieVideoKey(resp.movie_results[0].id).then((res) => {
                console.log(res.results[0].key)
                var container = document.createElement("div");
                container.setAttribute("id", "videoContainer")
                container.innerHTML = `
                                        <div>
                                        <iframe src="http://www.youtube.com/embed/${res.results[0].key} "
                                        width="560" height="315" frameborder="0"  allowfullscreen></iframe>
                                        </div >
                                    `
                mainContainer.appendChild(container);

            })
        }
    }
        )

      
    })


}