const express = require('express');
const router = express.Router();
const pool = require('../db');


//Get user credentials
router.get('/credentials', async(req, res) => {
    const userId = req.user.id;
    const query = `SELECT nombre,mail FROM usuario WHERE userid = ${userId}`

    try {

        const getCredentials = await pool.query(query);
        res.json(getCredentials.rows[0])


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
})


//Get categories list.

router.get('/category', async(req, res) => {
    //const cat_tipo_id = req.body.cat_tipo_id; // req.body ex -> ( {"cat_tipo_id": 1) )
    //const query = `SELECT descripcion,catid FROM categoria WHERE cat_tipo_id = ${cat_tipo_id}`
    const query = `SELECT descripcion,catid FROM categoria`
    try {

        const getCategory = await pool.query(query);
        //        let response = {};
        //        console.log(getCategory.rows);
        //        getCategory.rows.forEach((obj) => {
        //           response[`${obj.descripcion}`] = obj.catid;
        //        })

        //res.json(response);
        res.json(getCategory.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }


})

module.exports = router;