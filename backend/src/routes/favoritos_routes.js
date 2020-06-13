const express = require("express")
const router = express.Router();
const conexion = require('../connectionRoutes');


//ruta de los favoritos
router.get(':user', ( req, res) =>{
        let sql =
                `SELECT recetas.rec_id AS id, rec_titulo AS nombre, rec_ingredientes AS ingredientes, rec_usr_id AS usuario, rec_puntuacion AS puntuacion, rec_foto AS imagen
                        FROM recetas, favoritos
                        WHERE favoritos.fav_usr_id = ${req.params.user}
                         AND recetas.rec_id = favoritos.fav_rec_id`

let values = [req.params.user]

conexion.query( sql, values, (err, result, fields =>{
    if(err) throw err;

    res.json(result);
}))

})


//agregar favoritos
router.post('/', (req, res) =>{
        let sqlInsert = `INSERT INTO favoritos
                         VALUES(?, ?)`;

                         let values = [ req.body.userId, req.body.recId ];

conexion.query(sqlInsert, values,  (err, result, fields) =>{
        if (err){
                res.json(
                        {
                                status: 'error',
                                message: 'Error al agregar al fav'

                        }
                )
        }
        else{
                res.json(
                        {
                                status: 'ok',
                                message: 'Se agrego fav'

                        }
                ) 
        }
})
})

//eliminar fav
router.delete('/', (req, res) =>{
        let sqlDelete = `DELETE FROM favoritos
                         WHERE fav_usr_id =?
                           AND fav_rec_id=?`;

                         let values = [ req.body.userId, req.body.recId ];

conexion.query(sqlDelete, values,  (err, result, fields) =>{
        if (err){
                res.json(
                        {
                                status: 'error',
                                message: 'Error al quitar al fav'

                        }
                )
        }
        else{
                res.json(
                        {
                                status: 'ok',
                                message: 'Fav eliminado'

                        }
                ) 
        }
})
})

module.exports = router;

