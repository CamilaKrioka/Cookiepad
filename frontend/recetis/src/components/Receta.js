import React from 'react';
import Row from 'react-bootstrap/Row';
import Card, { CardBody } from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import InconoNoFav from '../no_favorito.png';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


export default (props)=>{

    const handleEditClick = () =>{
        props.onEditClick( props.id );
    }

        return(
        <Col md={8} lg={6} xl={4} className="mb-4 text-center d-flex aling-items-stretch">

        <Card>

            <Card.Body>
                {props.type === 'recetas' &&
                <a className="nav-link p-0 text-right" href="#">
                <img src={InconoNoFav}></img>
                </a>
                }
                
                <Link to={"/recetas/" + props.id} className="nav-link p-0 text-aling-center" >
                <Card.Title style={{fonSize:"0.8rem"}} className="mb=5">
                    {props.titulo}
                </Card.Title>
                </Link>

                <img src={props.imagen}
                className="card-img-top"> 
                </img>

            </Card.Body>

            <Card.Footer>
        <small className="text-muted" >{props.usuario}</small>
            </Card.Footer>

            {
                props.type === 'mispublicaciones' &&

                <Row className="my-a">
                    <Col>
                        <Button variant= "ligth"
                                onClick = {handleEditClick}
                        >
                            <FontAwesomeIcon color="brown" icon={faEdit} />
                        </Button>    
                        <Button variant= "light">
                            <FontAwesomeIcon color="black" icon= {faTrash} />
                        </Button>
                    </Col>
                </Row>
            }

        

        </Card>


        </Col>
        
)}