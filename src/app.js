const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Load Routes
const booksRoutes = require("./routes/books");

app.use("/", booksRoutes);

module.exports = app;
