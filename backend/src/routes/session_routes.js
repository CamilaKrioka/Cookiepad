const express = require('express');
const router = express.Router();
const conexion = require('../connectionRoutes');

router.post('/', (req, res) =>{

    let sql = `
                SELECT*
                FROM usuarios
                WHERE usr_nombre = '${req.body.user}'
                 AND usr_password = '${req.body.password}' ` ;

let values = [
                req.body.user,
                req.body.password
             ]

conexion.query(sql, (err, result, fields) =>{
    if ( err ) {
        res.json(
            {
                status: 'ok',
                mesagge: 'No es posible accerder en este momento'
            }
        )
    }else {
            if(result.length == 1){
                req.session.user = req.body.user,
                req.session.userId = result[0].userId;
        
                res.json(
                    {
                        status : 'ok',
                        message : 'sesion iniciada',
                        loggedUser: {
                                        id: req.session.userId,
                                        nombre: result[0].usr_nombre
                                     }
                            
                     }
                 )
        
            }
            else{
                res.json(
                    {
                      
                            status:'error',
                            mesagge: 'usuario y/o contraseña no validos',
                    }
                 );
              }
       }

    })





router.delete('/', (req, res) =>{
    req.session.destroy( err =>{
        if( err ){
            res.json(
                {
                    status : 'error',
                    mesagge : 'Error al cerra la sesion'
                
                }
            )
        }else{
            res.clearCookie('cookiepad2');
            res.json(
                {
                    status : 'ok',
                    message : 'sesion cerrada'
                }
            )
        }
    })
})
});   

 module.exports = router;