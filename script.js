console.log("Movie Watchlist App Started");

const API_KEY = "c34de72b";

const movieContainer = document.getElementById("movie");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const watchlistContainer = document.getElementById("watchlist");
const themeToggle = document.getElementById("theme-toggle");

let allMovies = [];

let watchlist = localStorage.getItem("watchlist");

if (watchlist) {
  watchlist = JSON.parse(watchlist);
} else {
  watchlist = [];
}


function fetchMovies() {
  let searchText = searchInput.value;

  if (searchText === "") {
    searchText = "batman";
  }

  movieContainer.innerHTML = "<p>Loading...</p>";

  fetch("https://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + searchText)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.Response === "False") {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        allMovies = [];
        return;
      }

      allMovies = data.Search;

      displayMovies();
      displayWatchlist();
    })
    .catch(function(error) {
      movieContainer.innerHTML = "<p>Error fetching movies.</p>";
      console.log(error);
    });
}


function displayMovies() {

  let filteredMovies;

  if (filterSelect.value === "all") {
    filteredMovies = allMovies;
  } else {
    filteredMovies = allMovies.filter(function(movie) {
      return movie.Type === filterSelect.value;
    });
  }


  let sortedMovies = [...filteredMovies];


  if (sortSelect.value === "year-asc") {
    sortedMovies.sort(function(a, b) {
      return Number(a.Year) - Number(b.Year);
    });
  }

  if (sortSelect.value === "year-desc") {
    sortedMovies.sort(function(a, b) {
      return Number(b.Year) - Number(a.Year);
    });
  }

  if (sortSelect.value === "title-asc") {
    sortedMovies.sort(function(a, b) {
      if (a.Title < b.Title) {
        return -1;
      } else if (a.Title > b.Title) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  if (sortSelect.value === "title-desc") {
    sortedMovies.sort(function(a, b) {
      if (a.Title > b.Title) {
        return -1;
      } else if (a.Title < b.Title) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  if (sortedMovies.length === 0) {
    movieContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }


  movieContainer.innerHTML = "";


  sortedMovies.forEach(function(movie) {

    let isInWatchlist = watchlist.find(function(item) {
      return item.imdbID === movie.imdbID;
    });

    let poster = movie.Poster;

    if (poster === "N/A") {
      poster = "https://via.placeholder.com/300x450?text=No+Image";
    }

    let card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
      <button onclick="toggleWatchlist('${movie.imdbID}')">
        ${isInWatchlist ? "Remove From Watchlist" : "Add To Watchlist"}
      </button>
    `;

    movieContainer.appendChild(card);
  });
}


function toggleWatchlist(id) {

  let selectedMovie = allMovies.find(function(movie) {
    return movie.imdbID === id;
  });

  let alreadyExists = watchlist.find(function(movie) {
    return movie.imdbID === id;
  });


  if (alreadyExists) {
    watchlist = watchlist.filter(function(movie) {
      return movie.imdbID !== id;
    });
  } else {
    watchlist.push(selectedMovie);
  }


  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  displayMovies();
  displayWatchlist();
}



function displayWatchlist() {

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = "<p>Watchlist is empty.</p>";
    return;
  }


  watchlistContainer.innerHTML = "";


  watchlist.forEach(function(movie) {

    let poster = movie.Poster;

    if (poster === "N/A") {
      poster = "https://via.placeholder.com/300x450?text=No+Image";
    }

    let card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
      <button onclick="toggleWatchlist('${movie.imdbID}')">
        Remove
      </button>
    `;

    watchlistContainer.appendChild(card);
  });
}



searchInput.addEventListener("input", function() {
  fetchMovies();
});

filterSelect.addEventListener("change", function() {
  displayMovies();
});

sortSelect.addEventListener("change", function() {
  displayMovies();
});

themeToggle.addEventListener("click", function() {

  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }

});


fetchMovies();
displayWatchlist();