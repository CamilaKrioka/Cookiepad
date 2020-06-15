import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Receta from './Receta';
import Swal from 'sweetalert2';


export default (props) => {

  

  return (
    <>
      <Container fluid style={{ backgroundColor: "#F9E79F" }} className="my-3 justify-content-center m-0  p-3">

        <Row >
          <Col className="text-center">
            <img src="https://scontent-eze1-1.xx.fbcdn.net/v/t1.0-9/104317116_10220725327301154_702736721514877582_n.jpg?_nc_cat=102&_nc_sid=730e14&_nc_ohc=g_EKFR5WT9sAX9Fy4XE&_nc_ht=scontent-eze1-1.xx&oh=6bb45a8302c6fdb6531e00430ade73c5&oe=5F0EB71B" style={{}} roundedCircle

            ></img>

          </Col>
        </Row>

        <Row >
          <Col className="text-center" style={{ fontSize: "xx-large", fontStyle: "Menlo" }}> {props.user.nombre}</Col>
        </Row>
        <Row>
        
       </Row>
      </Container>
      



    </>
  )
}

