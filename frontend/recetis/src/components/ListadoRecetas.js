import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Receta from './Receta';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import Swal from 'sweetalert2';
import RecetaEditorModal from './RecetaEditorModal';
import { icon } from '@fortawesome/fontawesome-svg-core';

const ListadoRecetas = (props)=>{

        const [ recetas, setRecetas ] = useState([])

        const [showRecetaEditorModal, setShowRecetaEditorModal] = useState (null);

        const [selectedReceta, setSelecetedReceta] = useState (null);

        const [favoritos, setFavoritos] = useState ([]);


        const handleHideRecetaEditorModal =() =>{
                setSelecetedReceta(null);
               setShowRecetaEditorModal(false);
        }

        const onShowRecetaEditorModal = () =>{
                setSelecetedReceta(null);
                setShowRecetaEditorModal(true);
                
        }        

        const handleRecetaSaved = (message) =>{
             setShowRecetaEditorModal(false);
             cargarListadoRecetas();

        

                Swal.fire(
                {
                   text: message,
                   icon: 'succes'
                }

            )

        }
        const handleChangeFavStatus =(isFav, recId, userId) =>{

        let url ='http://localhost:8080/favoritos';

        const formData =new FormData();
        
        formData.append('recId', recId);
        formData.append('userId', userId);
        
        

        let method = isFav ? 'DELETE' : 'POST';

        fetch(url, {
                method,
                body: formData,
                credentials: 'include'
        }).then(response => response.json())
        .then( data=>{
                cargarListadoRecetas();

                Swal.fire(
                        {
                        title: data.message,
                        icon: 'success'
                        }
                )
        })
     }
        

        const cargarListadoRecetas = () =>{
              let endpoint = 'recetas';


              if(props.type === 'recetas' && props.terminoBuscado){
                endpoint += '/search/' + props.terminoBuscado;
              }
              else{
                      if(props.user){

                           switch (props.type){

                                case 'mispublicaciones':
                                   
                                        endpoint += '/user/' + props.user.id;
                                        break;
                                case 'favoritos':
                                        endpoint = 'favoritos/' + props.user.id;
                                        break;
                                }
                      }
                }

                if(props.user){
                        //obtengo los favoritos
                        fetch(`http://localhost:8080/favoritos/${props.user.id}`).then(
                                response => response.json()
                        ).then(
                                data =>{
                                        setFavoritos(data);

                                        fetch(`http://localhost:8080/${endpoint}`).then(
                                                response => response.json
                                        ).then(
                                                 data => {
                                                setRecetas( data );

                                                }
                                        )
                                }
                         )
                        
                        
                   
                }else {
                        fetch(`http://localhost:8080/favoritos/${endpoint}`).then(
                                response => response.json()
                        ).then(
                                data =>{
                                        setRecetas( data );

                                       }
                                
                              )
                }

        }

        useEffect( cargarListadoRecetas, [props.user, props.terminoBuscado] );

        const handleEditClick = (idReceta)=>{
          setSelecetedReceta(idReceta);
          setShowRecetaEditorModal(true);
          
         }



         const handleDeleteClick = (idReceta) =>{
                 
                Swal.fire({
                        title: 'Confirmar que sea eliminar la receta',
                        icon: 'question',
                        showCancelButton : true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText : 'Cancelar'
                }).then( result =>{
                   if( result.value ){
                        
                        fetch(`http://localhost:8080/recetas/${idReceta}`,
                        {
                        method: 'DELETE',
                        credentials: 'include'
                        }
                      ).then(
                             response=> response.json()
                      ).then(
                              data =>{
                                if(data.status === 'ok'){
                                        Swal.fire({
                                                text: data.message,
                                                icon:'success'
                                        });
                                    
                                   cargarListadoRecetas();
                                }else{
                                        Swal.fire({
                                                text: data.message,
                                                icon: 'error'
                                        })
                                }
                            }
                      )
                   }
                })
         }
        
   const isUserFav = idReceta =>{
        return( favoritos.filter( favorito => idReceta === favorito.id).length);
   }
    
    return(

        <>
        {
           props.type === 'mispublicaciones' &&
              <NavBarMisPublicaciones handleShowRecetaEditorModal={onShowRecetaEditorModal} />
        }

        <Row className="m-3">

                {
                        recetas.map( receta =>{
                                return(
                                        <Receta titulo={receta.nombre}
                                                imagen={receta.imagen}
                                                usuario={receta.usuario}
                                                id={receta.id}
                                                type={props.type}
                                                onEditClick ={handleEditClick}
                                                onDeleteClick = {handleDeleteClick}
                                                user= {props.user}
                                                isFav= {isUserFav(receta.id)}
                                                onChangeFavStatus= {handleChangeFavStatus}
                                        />
           
                                )
                        }
                        )
                }
            
           

        </Row>
        <RecetaEditorModal show={showRecetaEditorModal}
                           handleHide= {handleHideRecetaEditorModal}
                           onRecetaSaved = {handleRecetaSaved}
                           idReceta =  {selectedReceta}
        />                   
        </>
    );
}

export default ListadoRecetas;