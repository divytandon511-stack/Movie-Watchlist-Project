
import { checkPaths, scanDirectory } from "pathcase-audit";

console.log("=== Checking filename collisions ===");

const paths = [
  "assets/MoviePoster.png",
  "assets/movieposter.png",
  "src/Watchlist.js",
  "src/watchlist.js"
];

const result = checkPaths(paths);

console.log(JSON.stringify(result, null, 2));

console.log("\n=== Scanning Movie Watchlist Project ===");

const report = await scanDirectory(".", {
  ignore: [".git", "node_modules"]
});

console.log(
  report.hasCollisions
    ? JSON.stringify(report.collisions, null, 2)
    : "No ASCII case collisions found."
);
