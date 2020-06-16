import React, { useState, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container'


export default (props) => {

    let { id } = useParams();

    let [receta, setReceta] = useState([]);

    useEffect(

        () => {

            fetch('http://localhost:8080/recetas/' + id).then(
                response => response.json()
            ).then(data => {
                setReceta(data);
                console.log(data)


            })
        }, []

    )


    return (

        <>
        
            <Row className="d-flex justify-content-center">
                <Col md="12">
                    <Breadcrumb>
                        <LinkContainer to="/" exact>
                            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item href="#">
                            Receta {receta.nombre}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

            </Row>
            <Container>
            <Row className="d-flex justify-content-left">
                <Col md={2} >
                    <h2>
                        {receta.nombre}
                    </h2>
                </Col>
           
                <Col md={4} className="d-flex ">
                    <img src={receta.imagen} className="img-fluid" />
                    
                </Col>
                <Col style={{ backgroundColor: "#F9E79F" }}><h3> Ingredientes:  </h3>
                    <h4> {receta.ingredientes} </h4></Col>
            </Row>

         </Container>   
           

        </>
    )
}

