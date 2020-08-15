const fetchApi = {
  url: "https://movies-app-siit.herokuapp.com/movies",
  url1: "https://movies-app-siit.herokuapp.com",
  API_KEY: "0a64770f4b1cacedd4f7b29e8c4e46a8",

  getFilteredMovieList: function (query, url) {
    if (typeof url === "undefined") {
      const queryParams = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&");
      url = `${this.url}?${queryParams}`;
    }
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => response.json());
  },

  getMovieById: function (id) {
    return fetch(`${this.url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => response.json());
  },

  registerUser(name, email, pass) {
    const urlencoded = new URLSearchParams();

    urlencoded.append("name", name);
    urlencoded.append("username", email);
    urlencoded.append("password", pass);

    return (
      fetch(`${this.url1}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded,
      })
        .then((response) => {
          console.log("1st response:", response);
          if (response.status === 200) {
            setTimeout(() => {
              window.location.href = "../pages/home.html";
            }, 1500);
          } else if (response.status != 200) {
            window.location.href = "../pages/register.html";
            alert("This user already exist, please log in !");
          }

          return response.json();
        })
        // .then((result) =>
        //   window.localStorage.setItem("accessToken", `${result.accessToken}`)
        // )

        .catch((error) => console.log("error", error))
    );
  },

  removeMovie: function (id, callback) {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.text())
      .then((result) => {
        console.log(result);
        callback();
      });
  },

  loginMethod(email, password, callback) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password", password);

    return fetch(`${this.url1}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    }).then((response) => {
      return response.json();
    });
  },

  addMovie: function (urlencoded) {
    return fetch(`${this.url}`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(urlencoded),
    });
  },

  editMovie: function (id, updatedMovie) {
    return fetch(`${this.url1}/movies/${id}`, {
      method: "PUT",
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: updatedMovie,
    });
  },

  getIdForTrailer: function (imdbId) {
    return fetch(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${this.API_KEY}&language=en-US&external_source=imdb_id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((response) => response.json());
  },

  getMovieVideoKey: function (id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((response) => response.json());
  },
};
