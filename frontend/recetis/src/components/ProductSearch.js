import React from 'react';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


export default () =>
     
     <Row className="my-3 justify-content-center my-0">

         <Col xs={12} md= {6} lg={4}>

            <Form>

                <Form.Group>

                    <Form.Row>

                        <Col sm={10} xs={8}>
                            <FormControl type="text" />
                        </Col>

                        <Col sm={2} xs={4}>

                            <Button variant="dark">
                                Buscar
                            </Button>
                            
                        </Col>

                    </Form.Row>

                </Form.Group>

            </Form>
         
         
         </Col>

        
     </Row>
