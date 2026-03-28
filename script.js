console.log("Movie Watchlist App started")

const API_KEY = "c34de72b";

const searchButton = document.getElementById("searchbutton");
const searchInput = document.getElementById("searchinput");
const movieContainer = document.getElementById("moviecontainer")


searchButton.addEventListener("click", fetchMovies);

function fetchMovies() {
  const query = searchInput.value.trim(); 

  if (query === "") {
    movieContainer.innerHTML = "<p>Please enter a movie name</p>";
    return;
  }

  movieContainer.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.Response === "False") {
      movieContainer.innerHTML = "<p>No movies found</p>";
    } else {
    displayMovies(data.Search);
    }
  })
  .catch(() => {
    movieContainer.innerHTML = "<p>Something went wrong. Please try again.</p>";
  });
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  if (!movies) {
    movieContainer.innerHTML = "<p>No movies found</p>";
    return;
  }

  movies.forEach((movie) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    `;

    movieContainer.appendChild(div);
  });
}

