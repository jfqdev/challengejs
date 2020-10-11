const jwt = require("jsonwebtoken");
require('../config/config'); //Enviroment variable jwtKey. This is not a secure approach to store our secret signing key.


module.exports = function(req, res, next) {
    // Getting token from header request.
    const token = req.header("jwtToken");

    // Checking if there is not token
    if (!token) {
        return res.status(403).json({ msg: "authorization denied" });
    }

    // Verify token
    try {

        const verify = jwt.verify(token, process.env.jwtKey);

        req.user = verify.user; // Adding to req object "user" property so it can be reachable by others routes.


        next();

    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};