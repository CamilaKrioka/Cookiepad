import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default props =>{

    const [recetaName, setRecetaName] = useState('');
    const [recetaIngredientes, setRecetaIngredientes] = useState('');    
    const [recetaPuntuacion, setRecetaPuntuacion] = useState('');
    const [recetaImage, setRecetaImage] = useState('');
    const [previewRecetaImage, setPreviewRecetaImage] = useState ('');

    const handleRecetaNombre = (event)=>{
       setRecetaName (event.target.value);
    }

    const handleRecetaIngredientes = (event)=>{
        setRecetaIngredientes (event.target.value);
    } 

    const handleRecetaPuntuacion = (event)=>{
        setRecetaPuntuacion(event.target.value);
     }

    const handleRecetaImageChange  = (event)=>{
        setRecetaImage (event.target.files[0]);

        setPreviewRecetaImage( URL.createObjectURL(event.target.files[0]) )
    }

  

    const handleSave = ()=>{

        const formData = new FormData();
        formData.append('recetaName', recetaName);
        formData.append('recetaIngredientes', recetaIngredientes);
        //formData.append('recetaUsuario', recetaUsuario);
        formData.append('recetaPuntuacion', recetaPuntuacion);
        formData.append('recetaImage', recetaImage);
        
        
        fetch('http://localhost:8080/recetas', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then( response => response.json() )
        .then( data => {
            if (data.status === 'ok'){
                props.onRecetaSaved();
            }
            else{
                alert(data.message);
            }
       })
        .catch( error => {
            console.log('Error');
        })
    }

    useEffect(
        ()=>{
            if(props.idReceta){
            
                fetch(`http://localhost:8080/recetas/` + props.idReceta).then(
                    response => response.json()
                ).then( 
                    data =>{
                        setRecetaName(data.nombre);
                        setRecetaIngredientes(data.ingredientes); 
                        setRecetaPuntuacion(data.puntuacion);
                        setRecetaImage('');
                        setPreviewRecetaImage(data.imagen);
                    }
                
             )
        }
            else{
                setRecetaName('');
                setRecetaIngredientes(''); 
                setRecetaPuntuacion('');
                setRecetaImage('');
                setPreviewRecetaImage('');
            }
           }, [props.idReceta]
           
    )
    


    return(

    <Modal show={props.show} onHide={props.handleHide}>

        <Modal.Header closeButton>
            <Modal.Title>Publicacion</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <Form>
            
                <Form.Group>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text"
                                  value= {recetaName}
                                  onChange={handleRecetaNombre}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control type="text"
                                  value= {recetaIngredientes}
                                  onChange={handleRecetaIngredientes}
                    />
                </Form.Group>
                

                <Form.Group>
                    <Form.Label>Puntuacion</Form.Label>
                    <Form.Control type="text"
                                  value= {recetaPuntuacion}
                                  onChange={handleRecetaPuntuacion}
                    />
               </Form.Group>
               
               <Form.Group className="d-flex justif-content-center">
                   {previewRecetaImage &&
                   <img style= { {height : "25vh"} } src={ previewRecetaImage } />
                   }
               </Form.Group>
               

                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file"
                                  onChange={handleRecetaImageChange}
                    />
                </Form.Group>
            </Form>

        </Modal.Body>

        <Modal.Footer>
            <Button variant= "secondary">
                Cancelar
            </Button>

            <Button variant= "dark"
                    onClick= {handleSave}
            >
                Guardar

            </Button>
        </Modal.Footer>



    </Modal>
    )
}
    