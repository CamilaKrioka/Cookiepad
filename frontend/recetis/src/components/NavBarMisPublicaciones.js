import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default (props) =>{

    return(
<>
        <Row className="d-flex justify-content-center">
                    <Col md="12"> 
                    <Breadcrumb>
                        <Breadcrumb.Item href='http://localhost:3000'>Incio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#"> 
                            Mis publicaciones
                        </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

        </Row>

        <Row className="my-3 ml-4">

            <Col>
                <Button onClick= {props.handleShowRecetaEditorModal}>
                    Nueva Publicacion
                </Button>
            </Col>

        </Row>
  </>
)}