const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPaths = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPaths));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vaska",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Vaska",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page!!!",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "windy",
    location: "kutaisi",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port:3000");
});
