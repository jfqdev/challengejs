// Database config.

const Pool = require('pg').Pool;

const pool = new Pool({

    user: "postgres",
    password: "vito1234",
    port: 5432,
    database: "challengejs"

});

module.exports = pool;