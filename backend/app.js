const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const dbug = require("debug")("app");

const app = express();

dbug("Process env: %o" + config.env);
dbug(config);
const dbstr = process.env.MONGO_ATLAS || config.db.host;

mongoose
    // config.db.host, { useNewUrlParser: true }
    .connect(
        dbstr, { useNewUrlParser: true }
    )
    .then(() => {
        dbug("Connected to database!");
    })
    .catch((err) => {
        dbug("Connection failed! %o", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",
    express.static(path.join("images"))
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
