const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
// const config = require("./config");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();
// console.log(process.env.NODE_ENV);
mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0-uicrg.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",
    express.static(path.join("backend/images"))
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

//DEPLOY
app.use(express.static(path.join(__dirname, '../dist/meantest')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/meantest/index.html'));
});

module.exports = app;
