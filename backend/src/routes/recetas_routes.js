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


    conexion.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);


    })

})

//buscador
router.get('/search/:terminoBuscado', (req, res) => {

    let sqlSearch = `SELECT rec_id AS id, rec_titulo AS nombre, rec_ingredientes AS ingredientes, rec_usr_id AS usuario, rec_puntuacion AS puntuacion, rec_foto AS imagen, rec_tag_id AS categorias, rec_modo_id AS modos
                   FROM recetas
                   WHERE rec_titulo LIKE ?`;

    let values = [`%${req.params.terminoBuscado}%`];


    let orderBy = '';

    if (req.query.categoria) {
        sqlSearch += 'AND rec_tag_id = ' + req.query.categoria;
    }

    if (req.query.modos) {

        sqlSearch += ' AND rec_modo_id = ' + req.query.modos;
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

    sqlSearch += orderBy;



    conexion.query(sqlSearch, values, function (err, result, fields) {
        if (err) throw err;

        res.json(result);


    })

})



/*esta es la consulta a mis publicaciones*/
router.get('/user/:id', (req, res) => {

    let sqlPub = `SELECT rec_id AS id, rec_titulo AS nombre, rec_ingredientes AS ingredientes, rec_usr_id AS usuario, rec_puntuacion AS puntuacion, rec_foto AS imagen, rec_modo_id AS modo, rec_tag_id AS categoria
                  FROM recetas
                  WHERE rec_usr_id = ${req.params.id}`;


    let orderBy = '';

    if (req.query.categoria) {
        sqlPub += ' AND rec_tag_id = ' + req.query.categoria;
    }

    if (req.query.modos) {

        sqlPub += ' AND rec_modo_id = ' + req.query.modos;
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

    sqlPub += orderBy;
    console.log(sqlPub);

    conexion.query(sqlPub, function (err, result, fields) {
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
                   rec_foto,
                   rec_modo_id,
                   rec_tag_id)
                   VALUES (
                        '${req.body.recetaName}',
                        '${req.body.recetaIngredientes}',
                        ${req.session.userId},
                        ${req.body.recetaPuntuacion},
                        '${process.env.IMAGES_URL + imageFileName}',
                         ${req.body.selectModo},
                       ${req.body.recetaCategory} )`;

    console.log(req.body.recetaName,
        req.body.recetaIngredientes,
        req.session.userId,
        req.body.recetaPuntuacion,
        req.body.selectModo,
        req.body.recetaCategory);

    


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
                    rec_puntuacion = ?,
                    rec_modo_id=?,
                    rec_tag_id=? `;

    let values = [
        req.body.recetaName,
        req.body.recetaIngredientes,
        req.body.recetaPuntuacion,
        req.body.selectModo,
        req.body.recetaCategory
    ];
     console.log(req.body);

    if (req.files) {
        //borro el archivo de la imagen anterior
        conexion.query('SELECT rec_foto FROM recetas WHERE rec_id=?' + req.params.id, function (err, result, fields) {
            if (err) {
                console.log('error')
            } else {

                fs.unlink('../public/images' + path.basename(result[0].rec_foto), err => {
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

        sqlUpdate += ',rec_foto =? ';
        values.push(process.env.IMAGES_URL + imageFileName);

    } else {
        console.log('No hay archivo');
    }

    sqlUpdate += 'WHERE REC_ID = ?';
    values.push(req.params.id);

    conexion.query(sqlUpdate, values, function (err, result, fields) {
        if (err) {
            console.log(err);
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