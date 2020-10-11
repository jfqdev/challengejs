//require('./config/config'); // Uncomment to add an initial configuration to the server.

//Deploy config
const PORT = process.env.PORT || 3001;


const path = require("path");
const express = require('express');
const app = express();
const index = require('./routes/index'); // Getting routes manager.
const cors = require('cors');


//Middleware
if (process.env.NODE_ENV === "production") {
    //server static content
    app.use(express.static(path.join(__dirname, "client/build")))
}
app.use(cors());

app.use(express.json()) //JSON parser.


app.use(index); // Mounting our routes manager.


//Express Server

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
});