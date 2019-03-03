const jwt = require("jsonwebtoken");

//Middleware is just a function (e.g multer, ...)
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("split token = " + token);
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        console.log("Verify Not Error");
        console.log((req.userData));
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        console.log("----- Check Auth Error ---");
        console.log(error);
        res.status(401).json({ message: "Auth fail from checkAuth" });
    }
    //extract token from "Bearer tokenhere"
}