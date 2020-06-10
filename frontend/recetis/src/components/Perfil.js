/* /import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListadoRecetas from './ListadoRecetas';


export default ()=>{
    return(

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
    

<Container>
                <Row>
                    
                     <Col xs={6} md={4}>
                         <Image src={receta.imagenUsuario} roundedCircle />
                    </Col>
                    
                </Row>
        </Container>
 
    )
} */