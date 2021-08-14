const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Load Routes
const booksRoutes = require("./routes/books");
const authorsRoutes = require("./routes/authors");

app.use("/", booksRoutes);
app.use("/", authorsRoutes);

module.exports = app;
