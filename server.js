//require('./config/config'); // Uncomment to add an initial configuration to the server.

const express = require('express');
const app = express();
const index = require('./routes/index'); // Getting routes manager.
const cors = require('cors');


//Middleware
app.use(cors());

app.use(express.json()) //JSON parser.


app.use(index); // Mounting our routes manager.


//Express Server

app.listen(3001, () => {
    console.log('Listening to port 3001')
});