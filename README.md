# Movie Watchlist App

h## Live Demo

[Visit Movie Watchlist Website](https://movie-watchlist-project-green.vercel.app/)

## Project Description
Movie Watchlist App is a web application built using HTML, CSS, and JavaScript. It allows users to search for movies using the OMDb API and add their favorite movies to a personal watchlist.

This project was created as part of an individual graded project to demonstrate JavaScript concepts such as API integration, DOM manipulation, array higher-order functions, responsive design, and localStorage.

---

## Features Implemented

### Core Features
- Search movies by title using OMDb API
- Display movie posters, title, year, and type
- Add movies to watchlist
- Remove movies from watchlist
- Show empty state when no movies are found
- Show empty state when watchlist is empty

### Additional Features
- Filter movies by type (Movie / Series / Episode)
- Sort movies by title and year
- Dark Mode / Light Mode Toggle
- Save watchlist in localStorage
- Save selected theme in localStorage
- Loading indicator while fetching data
- Error handling for invalid searches / API failures
- Fully responsive design for mobile, tablet, and desktop

---

## Array Higher-Order Functions Used
This project uses the following Array Higher-Order Functions as required:

- `map()` → To render movie cards dynamically
- `filter()` → To filter movies by type and remove from watchlist
- `find()` → To check if a movie already exists in watchlist
- `sort()` → To sort movies by title and year

---

## API Used
- OMDb API

---

## Tech Stack
- HTML
- CSS
- JavaScript
- OMDb API
- localStorage

---

## Project Structure
- index.html
- style.css
- script.js
- README.md


---

## Deployment
Deployed using Vercel / Netlify

---

## Author
Divy Tandon

## NPM Package Integration — pathcase-audit

This project integrates my published NPM package, **[pathcase-audit](https://www.npmjs.com/package/pathcase-audit)**, to detect case-insensitive filename and directory conflicts.

### Installation

Requires Node.js 22 or newer.

```bash
npm install
```

### Check Project Files

```bash
npm run check:paths
```

This scans the Movie Watchlist project for filename and folder case collisions.

### Run Integration Demo

```bash
node demo/pathcase-demo.mjs
```

The demonstration uses two functions:

- `checkPaths()` — detects filename collisions before files are created.
- `scanDirectory()` — scans the actual project directory.

### GitHub Actions

The project uses GitHub Actions to automatically run pathcase-audit whenever code is pushed or a pull request is opened.

### Links

- **NPM Package:** https://www.npmjs.com/package/pathcase-audit
- **Package Repository:** https://github.com/divytandon511-stack/pathcase-audit
- **Demo Repository:** https://github.com/divytandon511-stack/Movie-Watchlist-Project