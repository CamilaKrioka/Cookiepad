import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Receta from './Receta';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import RecetaEditorModal from './RecetaEditorModal';
import Swal from 'sweetalert2';
const ListadoRecetas = (props)=>{

        const [ recetas, setRecetas ] = useState([])

        const [showRecetaEditorModal, setShowRecetaEditorModal] = useState (false);

        const handleHideRecetaEditorModal =() =>{
               setShowRecetaEditorModal(false);
        }

        const onShowRecetaEditorModal = (message) =>{
                setShowRecetaEditorModal(true);
                cargarListadoRecetas();

                Swal.fire(
                {
                   text: message,
                   icon: 'succes'
                }

            )

        }
        
        const handleRecetaSaved = () =>{
                setShowRecetaEditorModal(false);
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
          setShowRecetaEditorModal(true);
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
    )

}

export default ListadoRecetas;