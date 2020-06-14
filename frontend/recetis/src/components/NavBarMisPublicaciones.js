import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';

export default (props) => {

    return (
<>
            <Row className="d-flex justify-content-center">
                <Col md="12">
                    <Breadcrumb>
                        <LinkContainer to="/" exact>
                            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                      </LinkContainer>
                            <Breadcrumb.Item href="#">
                                Mis publicaciones
                        </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

        </Row>

                <Row className="my-3 ml-4">

                    <Col>
                        <Button onClick={props.handleShowRecetaEditorModal}>
                            Nueva Publicacion
                </Button>
                    </Col>

                </Row>
  </>
)}