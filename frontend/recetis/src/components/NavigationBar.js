import React, {useState} from 'react';
import Button from 'react-bootstrap/button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo.png';
import LoginModal from './LoginModal';


const Navigationbar = (props) =>{

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleHideLoginModal = () =>{
    setShowLoginModal(false);
  }

  const handleShowLoginModal = () =>{
    setShowLoginModal(true);
  }

  

    return(
      <>
      
        <Navbar style={ { backgroundColor : "#E9A62A" } } expand="lg">
        

        
        <Link to="/" className="navbar-brand">
        <img style={{ height : "5rem", marginRight : "0.5rem" }} src={logo}></img>
        <Navbar.Text>Cookiepad</Navbar.Text>
        </Link>
            
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">

          { !props.user
            ?
              <Button 
                  variant="dark"
                  onClick={ handleShowLoginModal}
              
              >Inciar sesion
              </Button>
            :
              
                  <>
                                    <Link to="/mispublicaciones" className="nav-link">
                                        Mis publicaciones
                                    </Link>

                                    <Link to="/favoritos" className="nav-link">
                                        Mis favoritos
                                    </Link>

                                    <NavDropdown alignRight title={props.user.nombre} >
                                        <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                                        <NavDropdown.Divider />

                                        <NavDropdown.Item onClick={props.handleLogout}>
                                            Cerrar sesión
                                        </NavDropdown.Item>
                                    </NavDropdown> 
                    </>
            

            
          }    

          </Nav>


        </Navbar.Collapse>
      </Navbar>

      <LoginModal show={showLoginModal} 
      handleHide={handleHideLoginModal}
      handleLoginSuccess={props.handleLoginSuccess}

      />

      
     </>   
    )
}

export default Navigationbar;