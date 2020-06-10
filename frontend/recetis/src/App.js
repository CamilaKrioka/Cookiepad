import React, {useState} from 'react';
//import Header from './Header';
//import Footer from './Footer';
import Navigationbar from './components/NavigationBar';
import ProductSearch from './components/ProductSearch';
import ListadoRecetas from './components/ListadoRecetas';
import Slider from './components/Slider';
import DetalleReceta from './components/DetalleReceta';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';


function App() {

  const[user, setUser] = useState(null);

  const onLoginSuccess = (idusuario) =>{
    setUser(idusuario);
  }

  

  const onLogout = ()=>{
    
    let url = 'http://localhost:8080/auth';

    fetch(url, {
                  method: 'DELETE',
                  credentials : 'include'
               }
           ).then( response => response.json() )
            .then( data => {
                      setUser(null);
                    }
     )

  }
  return (

    <Router>

        <Navigationbar user={user}
                      handleLoginSuccess = {onLoginSuccess}
                      handleLogout = {onLogout}
                      
        />

        <Switch>
              <Route exact path= "/" children={
                                        <>
                                        <ProductSearch />

                                        <Slider />
                                        
                                        
                                        <ListadoRecetas type="recetas"/>
                                        </>
                                        
                                              }
                />
                
                <Route path="/recetas/:id" 
                                              
                              children=
                                      { 
                                        <>
                                        <DetalleReceta />
                                        <ProductSearch  />
                                        </>
                                      }

                />

                

                { user &&
                <Route exact path= "/mispublicaciones" children={
                                                                
                                                              <ListadoRecetas type="mispublicaciones"
                                                                              user= {user}
                                                              />
                                                                }
                />
                }
                
                <Redirect to={ { pathname: '/'} } />
          

        </Switch>

     
    </Router>
  )
}

export default App;
