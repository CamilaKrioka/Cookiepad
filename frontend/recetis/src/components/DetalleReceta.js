import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'


export default ()=>{

    let { id } = useParams();

    let [receta, setReceta] = useState(null);
    useEffect(
       () =>{
           fetch('http://localhost:8080/recetas/' + id).then(
               response => response.json(
               ).then( data => {
                   setReceta(data)
                   console.log(data);
               })
           )
       }, []
    
    )

    return(

        receta && 

      <>

        <Container>
                <Row>
                    
                     <Col xs={6} md={4}>
                         <Image src={receta.imagenUsuario} roundedCircle />
                    </Col>
                    
                </Row>
        </Container>

     

        <Row className="d-flex justify-content-center">
            <Col md={4} className="d-flex justify-content-center">
                <img src={receta.imagen} className="img-fluid" />

            </Col>
            <Col md={4} >
                <h2>
                    {receta.nombre}
                </h2>
                <h3>
                    {receta.usuario}
                </h3>
            
            </Col>
        </Row>
        </>
    )
}

