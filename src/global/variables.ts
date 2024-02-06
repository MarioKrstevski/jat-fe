// let mode = "development";
let mode = "production";

let backendURL = "";
let frontendURL = "";

if (window.location.hostname === "localhost") {
  mode === "development";
}

if (mode === "development") {
  backendURL = "http://localhost:5050";
  frontendURL = "http://localhost:5173";
} else {
  backendURL = "https://jat-be-api.onrender.com";
  frontendURL = "https://euphonious-faloodeh-b38ec6.netlify.app";
}
export { backendURL, frontendURL };
