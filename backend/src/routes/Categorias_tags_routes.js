const express = require('express');
const router = express.Router();
const conexion = require ('../connectionRoutes');

//Hago las rutas del select de categorias

router.get('/', (req, res) =>{
    let sql = `SELECT tag_id AS id, tag_nombre AS nombre
               FROM tags
               ORDER BY tag_nombre`;

conexion.query(sql, function(err, result, fields){
    if (err) throw err;

    res.json(result);
                
                
        })
    
    })



module.exports = router;