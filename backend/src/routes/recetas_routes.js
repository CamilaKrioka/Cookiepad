const express = require('express');
const router = express.Router();
const path = require('path');
const conexion = require('../connectionRoutes');
const fs = require('fs');

/*esta es la consulta al index*/
router.get('/', (req, res) => {

    let sql = `SELECT rec_id AS id, rec_titulo AS nombre, rec_ingredientes AS ingredientes, rec_usr_id AS usuario, rec_puntuacion AS puntuacion, rec_foto AS imagen, rec_tag_id AS categorias, rec_modo_id AS modos
               FROM recetas`;

    let where = '';
    let orderBy = '';

    if (req.query.categoria) {
        where = ' WHERE rec_tag_id = ' + req.query.categoria;
    }

    if (req.query.modos) {
        where += where == '' ? ' WHERE ' : ' AND ';
        where += 'rec_modo_id = ' + req.query.modos;
    }
    sql += where;
    console.log(sql);

    conexion.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);


    })

})

//buscador
router.get('/search/:terminoBuscado', (req, res) => {

    let sqlSearch = `SELECT 
             rec_id AS id,
             rec_titulo AS nombre, 
             rec_ingredientes AS ingredientes, 
             rec_usr_id AS usuario, 
             rec_puntuacion AS puntuacion, 
             rec_foto AS imagen,
             rec_tag_id AS categorias,
             rec_modo_id AS modos 
             FROM recetas
             WHERE rec_titulo LIKE ?`;

    let values = [`%${req.params.terminoBuscado}%`];

    conexion.query(sqlSearch, values, function (err, result, fields) {
        if (err) throw err;

        res.json(result);


    })

})



/*esta es la consulta a mis publicaciones*/
router.get('/user/:id', (req, res) => {

    let sql = `
                SELECT rec_id AS id,
                rec_titulo AS nombre,
                rec_ingredientes AS ingredientes, 
                rec_usr_id AS usuario, 
                rec_puntuacion AS puntuacion,
                rec_foto AS imagen 
                FROM recetas
                WHERE rec_usr_id = ${req.params.id};`

    conexion.query(sql, function (err, result, fields) {
        if (err) throw err;


        res.json(result);

    })

})



/*esta es la consulta a una publicacion, me tiene que traer el detalle*/
router.get('/:id', (req, res) => {

    let sql = `
                SELECT rec_id AS id,
                rec_titulo AS nombre,
                rec_ingredientes AS ingredientes, 
                rec_usr_id AS usuario, 
                rec_puntuacion AS puntuacion,
                rec_foto AS imagen 
                FROM recetas
                WHERE rec_id = ${req.params.id};
                `
    console.log(req.params.id);

    conexion.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result[0])



    })

})
/*hace las rutas de las imagenes*/
router.post('/', (req, res) => {

    let imageFileName = '';

    if (req.files) {

        let recetaImage = req.files.recetaImage;

        imageFileName = Date.now() + path.extname(recetaImage.name);

        recetaImage.mv('../public/images/' + imageFileName, function (err) {
            if (err) {
                console.log(err);
            }
        })

        console.log(imageFileName);
    } else {
        console.log('No hay archivo');
    }


    /*Inserta en base de datos desde recetaEditorModal con los append*/
    let sqlInsert = `INSERT INTO recetas
                   (rec_titulo, 
                   rec_ingredientes, 
                   rec_usr_id, 
                   rec_puntuacion, 
                   rec_foto)
                   VALUES (
                        '${req.body.recetaName}',
                        '${req.body.recetaIngredientes}',
                        ${req.session.userId},
                        ${req.body.recetaPuntuacion},
                        '${process.env.IMAGES_URL + imageFileName}'
                    )`;

    conexion.query(sqlInsert, function (err, result, fields) {
        if (err) {
            res.json(
                {
                    status: 'error',
                    message: 'Publicación no realizada'
                }
            )
        } else {
            res.json(
                {
                    status: 'ok',
                    message: 'Publicación realizada correctamente'
                }
            )
        }
    })

})

//update
router.put('/:id', (req, res) => {

    let imageFileName = '';

    let sqlUpdate = `UPDATE recetas
                    SET 
                    rec_titulo = ?,
                    rec_ingredientes = ?,
                    rec_puntuacion = ?`;

    let values = [
        req.body.recetaName,
        req.body.recetaIngredientes,
        req.body.recetaPuntuacion
    ];

    if (req.files) {
        //borro el archivo de la imagen anterior
        conexion.query('SELECT rec_foto FROM recetas WHERE rec_id=', function (err, result, fields) {
            if (err) {
                console.log('error')
            } else {

                ss.unlink('../public/images' + path.basename(result[0].rec_foto), err => {
                    if (err) throw err;

                    console.log('archivo borrado');
                });

            }

        })

        let recetaImage = req.files.recetaImage;

        imageFileName = Date.now() + path.extname(recetaImage.name);

        recetaImage.mv('../public/images/' + imageFileName, function (err) {
            if (err) {
                console.log(err);
            }
        })

        sqlUpdate += ',rec_foto =?';
        values.push(process.env.IMAGES_URL + imageFileName);

    } else {
        console.log('No hay archivo');
    }

    sqlUpdate += 'WHERE REC_ID = ?';
    values.push(req.params.id);

    conexion.query(sqlUpdate, values, function (err, result, fields) {
        if (err) {
            res.json(
                {
                    status: 'error',
                    message: 'Error al modificar la publicacion'
                }
            )
        } else {
            res.json(
                {
                    status: 'ok',
                    message: 'Publicación realizada correctamente'
                }
            )
        }
    })

})
//borrar una receta      
router.delete('/:id', (req, res) => {

    let sqlDelete = `DELETE FROM recetas
                    WHERE rec_id = ?`;

    values = [req.params.id];

    conexion.query(sqlDelete, values, (err, result, fields) => {
        if (err) {
            res.json(
                {
                    status: 'error',
                    message: 'Error al eliminar la receta'
                }
            )
        } else {
            res.json(
                {
                    status: 'ok',
                    message: 'La receta ha sido eliminada correctamente'
                }
            )
        }
    })
})










module.exports = router;