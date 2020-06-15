const express = require("express")
const router = express.Router();
const conexion = require('../connectionRoutes');


//ruta de los favoritos
router.get('/:user', (req, res) => {
        let sql =
                `SELECT recetas.rec_id AS id, rec_titulo AS nombre, rec_ingredientes AS ingredientes, rec_usr_id AS usuario, rec_puntuacion AS puntuacion, rec_foto AS imagen, rec_tag_id AS categorias, rec_modo_id AS modos
                        FROM recetas, favoritos
                        WHERE favoritos.fav_usr_id =?
                         AND recetas.rec_id = favoritos.fav_rec_id`

        let orderBy = '';

        if (req.query.categoria) {
                sql += 'AND rec_tag_id = ' + req.query.categoria;
        }

        if (req.query.modos) {

                sql += ' AND rec_modo_id = ' + req.query.modos;
        }


        if (req.query.orden) {
                orderBy = ' ORDER BY ';

                switch (req.query.orden) {
                        case 'menor_puntuacion':
                                orderBy += 'rec_puntuacion ASC';
                                break;

                        case 'mayor_puntuacion':
                                orderBy += 'rec_puntuacion DESC';
                                break;
                }
        }

        sql += orderBy;
        

        let values = [req.params.user]

        conexion.query(sql, values, (err, result, fields) => {
                if (err) throw err;

                res.json(result);
        })

})


//agregar favoritos
router.post('/', (req, res) => {
        let sqlInsert = `INSERT INTO favoritos
                         VALUES(?, ?)`;

        let values = [req.body.userId, req.body.recId];

        conexion.query(sqlInsert, values, (err, result, fields) => {
                if (err) {
                        res.json(
                                {
                                        status: 'error',
                                        message: 'Error al agregar al fav'

                                }
                        )
                }
                else {
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
router.delete('/', (req, res) => {
        let sqlDelete = `DELETE FROM favoritos
                         WHERE fav_usr_id =?
                           AND fav_rec_id=?`;

        let values = [req.body.userId, req.body.recId];

        conexion.query(sqlDelete, values, (err, result, fields) => {
                if (err) {
                        res.json(
                                {
                                        status: 'error',
                                        message: 'Error al quitar al fav'

                                }
                        )
                }
                else {
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

