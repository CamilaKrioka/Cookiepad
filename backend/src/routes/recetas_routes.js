const express = require('express');
const router = express.Router();
const path = require ('path');
const conexion = require ('../connectionRoutes');

/*esta es la consulta al index*/
router.get('/', (req, res) => {
    
    let sql = `SELECT 
             rec_id AS id,
             rec_titulo AS nombre, 
             rec_ingredientes AS ingredientes, 
             rec_usr_id AS usuario, 
             rec_puntuacion AS puntuacion, 
             rec_foto AS imagen 
             FROM recetas`;

    conexion.query(sql, function(err, result, fields){
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

              conexion.query(sql, function(err, result, fields){
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
                WHERE rec_id = ${req.params.id};`
              
    
    conexion.query(sql, function(err, result, fields){
            if (err) throw err;
            

            res.json(result)[0];
           
            

})

})

router.post('/',(req, res) =>{
    
let imageFileName = '';

    if ( req.files ){

        let recetaImage = req.files.recetaImage;

        imageFileName = Date.now() + path.extname(recetaImage.name);

        recetaImage.mv( '../public/images/' + imageFileName, function(err){
            if ( err ){
                console.log(err);
            }
        } )

        console.log(imageFileName);
    }else{
        console.log('No hay archivo');
    }
    

    let sqlInsert= `INSERT INTO recetas(rec_titulo, rec_ingredientes, rec_usr_id, rec_puntuacion, rec_foto)
                    VALUES (
                        '${req.body.recetaName}',
                        '${req.body.recetaIngredientes}',
                         ${req.session.userId},
                         ${req.body.recetaPuntuacion},
                        '${process.env.IMAGES_URL + imageFileName}'
                    )`;

    conexion.query(sqlInsert, function(err, result, fields){
        if ( err ) { 
            res.json(
                   {
                    status : 'error',
                    message : 'Publicación no realizada'
                    }
            )
        }else{
            res.json(
                    {
                     status : 'ok',
                     message : 'Publicación realizada correctamente'
                    }
              )
          }
      })
        
 })
        

module.exports = router;