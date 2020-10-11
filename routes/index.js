const express = require('express');
const router = express.Router();
const authorize = require("../middleware/authorize"); // Verifies JWT


//Routes
const operation = require('./operation');
const authentication = require('./authentication');
const information = require('./information');


//Mounting routes.
router.use('/operation', authorize, operation);
router.use('/authentication', authentication);
router.use('/information', authorize, information);
/* router.use("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html"))
}) */


/* Using authorize.js as middleware will secure our /operation route. Every request
to this URL will need a valid token on request header. */


module.exports = router;