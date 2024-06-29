// Requiring in connections
const express = require("express");
const path = require("path");
const db = require("./config/connections");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

// Setting up port
const PORT = process.env.PORT || 3001;
const app = express();

// Setting up express
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

// Production environment
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  });
};

// Open connection
db.once("open", () => {
  app.listen(PORT, () => console.log(`API server running on port ${PORT}!`));
});