const express = require('express');
const router = express.Router();
const conexion = require ('../connectionRoutes');

//hago el select de modos de coccion

router.get('/', (req, res) =>{
    let sql = `SELECT mod_id AS id, mod_nombre AS nombre
               FROM modos_coccion
               ORDER BY mod_nombre`;

conexion.query(sql, function(err, result, fields){
    if (err) throw err;

    res.json(result);
                
                
        })
    
    })


module.exports = router;