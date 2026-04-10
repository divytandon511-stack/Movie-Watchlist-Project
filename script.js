const API_KEY = "c34de72b";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const filterType = document.getElementById("filter-type");
const sortType = document.getElementById("sort-type");
const movieContainer = document.getElementById("movie-container");
const watchlistContainer = document.getElementById("watchlist-container");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

let movies = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let theme = localStorage.getItem("theme") || "dark";

body.className = theme;

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

async function fetchMovies(query) {
  if (query.trim() === "") {
    movies = [];
    hideError();
    renderMovies();
    return;
  }

  showLoading();
  hideError();

  try {
    const response = await fetch(
      `${BASE_URL}&s=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
      movies = data.Search;
    } else {
      movies = [];

      if (data.Error === "Movie not found!") {
        hideError();
      } else {
        showError(data.Error || "Something went wrong.");
      }
    }
  } catch (error) {
    movies = [];
    showError("Something went wrong while fetching movies.");
    console.log(error);
  }

  hideLoading();
  renderMovies();
}

function getFilteredAndSortedMovies() {
  let result = [...movies];

  if (filterType.value !== "all") {
    result = result.filter(function (movie) {
      return movie.Type === filterType.value;
    });
  }

  if (sortType.value === "title-asc") {
    result.sort(function (a, b) {
      return a.Title.localeCompare(b.Title);
    });
  } else if (sortType.value === "title-desc") {
    result.sort(function (a, b) {
      return b.Title.localeCompare(a.Title);
    });
  } else if (sortType.value === "year-asc") {
    result.sort(function (a, b) {
      return Number(a.Year) - Number(b.Year);
    });
  } else if (sortType.value === "year-desc") {
    result.sort(function (a, b) {
      return Number(b.Year) - Number(a.Year);
    });
  }

  return result;
}

function isInWatchlist(imdbID) {
  return watchlist.find(function (movie) {
    return movie.imdbID === imdbID;
  });
}

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function addToWatchlist(movie) {
  if (!isInWatchlist(movie.imdbID)) {
    watchlist.push(movie);
    saveWatchlist();
    renderWatchlist();
    renderMovies();
  }
}

function removeFromWatchlist(imdbID) {
  watchlist = watchlist.filter(function (movie) {
    return movie.imdbID !== imdbID;
  });

  saveWatchlist();
  renderWatchlist();
  renderMovies();
}

function addToWatchlistById(imdbID) {
  const selectedMovie = movies.find(function (movie) {
    return movie.imdbID === imdbID;
  });

  if (selectedMovie) {
    addToWatchlist(selectedMovie);
  }
}

function renderMovies() {
  movieContainer.innerHTML = "";

  const finalMovies = getFilteredAndSortedMovies();

  if (finalMovies.length === 0) {
    movieContainer.innerHTML =
      `<p class="empty-text">No movies found.</p>`;
    return;
  }

  const movieCards = finalMovies.map(function (movie) {
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/200x280?text=No+Image";

    const alreadyAdded = isInWatchlist(movie.imdbID);

    return `
      <div class="movie-card">
        <img src="${poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Type:</strong> ${movie.Type}</p>

        <button onclick="${
          alreadyAdded
            ? `removeFromWatchlist('${movie.imdbID}')`
            : `addToWatchlistById('${movie.imdbID}')`
        }">
          ${alreadyAdded ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    `;
  });

  movieContainer.innerHTML = movieCards.join("");
}

function renderWatchlist() {
  watchlistContainer.innerHTML = "";

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML =
      `<p class="empty-text">Your watchlist is empty.</p>`;
    return;
  }

  const watchlistCards = watchlist.map(function (movie) {
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/200x280?text=No+Image";

    return `
      <div class="watchlist-card">
        <img src="${poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Type:</strong> ${movie.Type}</p>

        <button onclick="removeFromWatchlist('${movie.imdbID}')">
          Remove
        </button>
      </div>
    `;
  });

  watchlistContainer.innerHTML = watchlistCards.join("");
}

function handleSearch() {
  const query = searchInput.value;
  fetchMovies(query);
}

function toggleTheme() {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

filterType.addEventListener("change", renderMovies);
sortType.addEventListener("change", renderMovies);
themeToggle.addEventListener("click", toggleTheme);

renderWatchlist();
renderMovies();