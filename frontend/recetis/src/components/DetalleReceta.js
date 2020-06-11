import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Breadcrumb from 'react-bootstrap/Breadcrumb';


export default ()=>{

    let  {id} = useParams();
    
    let [receta, setReceta] = useState([]);
    
    useEffect(
        
        ()=>{

            fetch('http://localhost:8080/recetas/' + id).then(
                response => response.json()
            ).then( data => {
                setReceta(data);
                console.log(data)
    
                  
            })
        }, []

    )
 

    return(
        
<>
        <Row className="d-flex justify-content-center">
            <Col md="12"> 
            <Breadcrumb>
                <Breadcrumb.Item href='http://localhost:3000'>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item href="#"> 
                    Receta {receta.nombre}
                </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

         </Row>

            <Row className="d-flex justify-content-center">
                <Col md={6} >
                       <h2>
                            {receta.nombre}
                        </h2>
                        
                    
                </Col>
            </Row>

        <Row className="d-flex justify-content-center">
            <Col md={4} className="d-flex ">
            <img src={receta.imagen} className="img-fluid"  />
            </Col>
        </Row>

        <Row className="d-flex justify-content-center">
            <Col md={4} className="d-flex ">
               <h3> Ingredientes:  </h3>
            </Col>
            
        </Row>   
        <Row className="d-flex justify-content-center">
            <Col md={6}>
                 <h4> {receta.ingredientes} </h4>
            </Col>
        </Row>
        
       </>
    )
}

