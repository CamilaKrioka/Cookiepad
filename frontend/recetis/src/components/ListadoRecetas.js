import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Receta from './Receta';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import Swal from 'sweetalert2';
import RecetaEditorModal from './RecetaEditorModal';

const ListadoRecetas = (props)=>{

        const [ recetas, setRecetas ] = useState([])

        const [showRecetaEditorModal, setShowRecetaEditorModal] = useState (false);

        const [selectedReceta, setSelecetedReceta] = useState (false);


        const handleHideRecetaEditorModal =() =>{
                setSelecetedReceta(null);
               setShowRecetaEditorModal(false);
        }

        const onShowRecetaEditorModal = () =>{
                setSelecetedReceta(null);
                setShowRecetaEditorModal(true);
                cargarListadoRecetas();
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

        let endpoint = 'recetas';

        if( props.user && props.type === 'mispublicaciones'){
                endpoint = 'recetas/user/' + props.user.id;
        }

        const cargarListadoRecetas = () =>{
                fetch(`http://localhost:8080/${endpoint}`).then(
                        response => response.json()
                ).then(
                        data => {
                                setRecetas(data)
                                
                                
                        }
                )
                

}

        useEffect( cargarListadoRecetas, [] );

        const handleEditClick = (idReceta)=>{
          setSelecetedReceta(idReceta);
          setShowRecetaEditorModal(true);
          
        }
        
for (let i = 0; i < recetas.length; i++) {
                console.log(recetas[i]) 
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
                                        />
           
                                )
                        }
                        )
                }
            
           

        </Row>
        <RecetaEditorModal show={showRecetaEditorModal}
                           handleHide= {handleHideRecetaEditorModal}
                           onRecetaSaved = {handleRecetaSaved}
        />                   
        </>
    );
}

export default ListadoRecetas;