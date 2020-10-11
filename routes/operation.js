const express = require('express');
const router = express.Router();
const pool = require('../db'); //Connection to db.


//Add new operation
router.post('/', async(req, res) => {

    const userId = req.user.id; // userId is defined 


    try {
        const { concepto, fecha, monto, tipo, categoria } = req.body; //Body's request must include this keys using JSON.
        const query = "INSERT INTO operacion (concepto,fecha,monto,tipo_id,usuario_id,categoria_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
        const newOp = await pool.query(query, [concepto, fecha, monto, tipo, userId, categoria]);
        res.json(newOp.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }

});

//Edit operation
router.put('/:id', async(req, res) => {


    try {
        const { id } = req.params; //Operation id
        const opElements = req.body;
        const key0 = Object.keys(opElements)[0]; // Field to update
        const key1 = Object.keys(opElements)[1];
        const key2 = Object.keys(opElements)[2];
        const key3 = Object.keys(opElements)[3];
        const value0 = opElements[key0];
        const value1 = opElements[key1];
        const value2 = opElements[key2];
        const value3 = opElements[key3]; // Updated value
        let query;
        if (!value3) {
            query = `UPDATE operacion SET ${key0} = $1, ${key1} = $2, ${key2} = $3 WHERE opid = $4`; // $1, $2 pg notation for parametric values.
            const editOp = await pool.query(query, [value0, value1, value2, id]); // Awaiting to resolve pool.query promise.

        } else {
            query = `UPDATE operacion SET ${key0} = $1, ${key1} = $2, ${key2} = $3, ${key3}= $4 WHERE opid = $5`; // $1, $2 pg notation for parametric values.
            const editOp = await pool.query(query, [value0, value1, value2, value3, id]); // Awaiting to resolve pool.query promise.

        }
        if (editOp.rowCount === 1) {
            res.status(200).json({ msg: `Operation #${id} successfully Edited` })
        } else {
            res.status(404).json({ msg: `Operation #${id} not found` })
        }



    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

//Delete operation
//Need operation id as a param.
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const delOp = await pool.query('DELETE from operacion WHERE opid = $1', [id]);

        if (delOp.rowCount === 1) {
            res.status(200).json({ msg: `Operation #${id} successfully Deleted` })
        } else {
            res.status(404).json({ msg: `Operation #${id} not found` })
        }


    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: "Server error" });
    }
})


//Get operations filtered by category/user/withdrawals or deposits.

router.post('/filtered', async(req, res) => {

    const userId = req.user.id;


    // Defining "categoria" parameter to filter by category in a sql query.
    let categoria;
    if (req.body.categoria) {
        categoria = `AND categoria_id = ${req.body.categoria}`
    } else {
        categoria = ''
    }


    // Defining "usuarioId" parameter to filter by user in a sql query.
    let usuarioId;
    usuarioId = `AND usuario_id = ${userId}`

    // Defining "selectAll" parameter to select db columns in a sql query.
    const selectOp = 'SELECT operacion.opid, operacion.concepto, operacion.monto, operacion.tipo_id, operacion.usuario_id, operacion.categoria_id, operacion.fecha,';
    const selectAll = selectOp + ' categoria.descripcion, tipo.caja';

    // Defining "joinAll "parameter to join tables and get foreing key values.
    const joinCat = 'JOIN categoria ON operacion.categoria_id = categoria.catid';
    const joinTipo = ' JOIN tipo ON operacion.tipo_id = tipo.tipoid';
    const joinAll = joinCat + joinTipo


    // Defining final query using all parameters.
    // & filtering by "caja" (withdrawals or deposits)
    let query;
    switch (req.body.caja) {
        case "ingreso":
            query = `${selectAll} FROM operacion ${joinAll} WHERE tipo_id = 1 ${categoria} ${usuarioId} ORDER by opid DESC`;
            break;

        case "egreso":
            query = `${selectAll} FROM operacion ${joinAll} WHERE tipo_id = 2 ${categoria} ${usuarioId} ORDER by opid DESC`;
            break;

        default: //Every operation ever made
            res.status(400).send({ msg: "Must include 'caja' property on request body. Valid values: ingreso, egreso" })
            break;
    }

    try {

        //Passing query to database, and retrieving filtered operations's JSON to the client. 
        const getOp = await pool.query(query);
        res.json(getOp.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }


})

//Get last 10 operations.
router.get('/last10', async(req, res) => {

    const userId = req.user.id; // Parameter to filter by user.

    let query = `SELECT * FROM operacion WHERE usuario_id = ${userId} ORDER by opid DESC LIMIT 10`

    try {

        const getLastOp = await pool.query(query);
        res.json(getLastOp.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }


})

//Get cash balance
router.get('/balance', async(req, res) => {
    const userId = req.user.id;

    const query = `SELECT SUM(monto) FROM operacion WHERE usuario_id = ${userId}`;

    try {

        const getBalance = await pool.query(query);
        res.json(getBalance.rows[0]) //ex -> {"sum": 1200}


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
})


module.exports = router;