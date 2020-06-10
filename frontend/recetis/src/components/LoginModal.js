import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginModal = (props) => {    

  const handleLoginClick = ()=>{
    
    let url = 'http://localhost:8080/auth';
    
    let params = {
      user: nombreUsuario,
      password: password
    };

    fetch(url, {
      method : 'POST',
      credentials : 'include',
      body: JSON.stringify( params ),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then( response => response.json() )
    .then( data => {
      if ( data.status === 'ok' ){
        props.handleLoginSuccess(data.loggedUser.id);
        props.handleHide();
      }
      else{
        alert(data.message);
      }
    });
  }

  const [ nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange=(event) =>{
    setNombreUsuario(event.target.value);
  }

  const handlePasswordChange=(event) =>{
    setPassword(event.target.value);
  }

  return (

  <Modal className="login-modal" show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          
          <Form.Group>
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text"
                            required="required"
                            value= {nombreUsuario}
                            onChange = {handleUserNameChange}
              />
          </Form.Group>

          <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type= "password"
                            required = "required"
                            vale={password}
                            onChange= {handlePasswordChange}
              />
          </Form.Group>

      </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary"
          onClick={props.handleHide}
        >
          Cancelar
        </Button>

      <Button 
        variant="dark"
        type="submit"
        onClick= { handleLoginClick }
      >
        Aceptar
      </Button>       
    </Modal.Footer>    
  </Modal>
  )
}

export default LoginModal;