console.log("Movie Watchlist App started")

const API_KEY = "c34de72b";
const movieContainer = document.getElementById("movie-container");
const loadingMessage = document.getElementById("loading-message");

function fetchMovies() {
  loadingMessage.style.display = "block";
  movieContainer.innerHTML = "";

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`)
    .then((response) => response.json())
    .then((data) => {
      loadingMessage.style.display = "none";

      if (data.Response === "False") {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        return;
      }

      displayMovies(data.Search);
    })
    .catch((error) => {
      loadingMessage.style.display = "none";
      movieContainer.innerHTML = "<p>Something went wrong while fetching movies.</p>";
      console.log(error);
    });
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    movieContainer.appendChild(card);
  });
}

fetchMovies();

