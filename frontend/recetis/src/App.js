import React, { useState } from 'react';
//import Header from './Header';
//import Footer from './Footer';
import Navigationbar from './components/NavigationBar';
import ProductSearch from './components/ProductSearch';
import ListadoRecetas from './components/ListadoRecetas';
import Slider from './components/Slider';
import DetalleReceta from './components/DetalleReceta';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Perfil from './components/Perfil';


function App() {

  const [user, setUser] = useState(null);
  const [searchRec, setSearchRec] = useState(null);
  const [filtros, setFiltros] = useState({
    categoria: '',
    modos: '',
    orden: '',
  });

  


  const onLoginSuccess = (loggedUser) => {
    console.log("onLoginSucces", loggedUser);
    setUser(loggedUser);
  }



  const onLogout = () => {

    let url = 'http://localhost:8080/auth';

    fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    }
    ).then(response => response.json())
      .then(data => {
        setUser(null);

      }
      )

  }

  const handleSearchRec = (terminoBuscado) => {
    if (terminoBuscado === '') {
      terminoBuscado = null;
    }
    setSearchRec(terminoBuscado);
  }

  const handleFilterChange = filtros => {
    setFiltros(filtros);

  }

 
  return (



    <Router>

      <Navigationbar user={user}
        handleLoginSuccess={onLoginSuccess}
        handleLogout={onLogout}

      />

      <Switch>
        <Route exact path="/" children={
          <>
            <ProductSearch onSearchRec={handleSearchRec} />

            <Slider />


            <ListadoRecetas type="recetas"
              user={user}
              searchRec={searchRec}
              filtros={filtros}
              onFilterChange={handleFilterChange}
            />
          </>

        }
        />

        <Route exact path="/recetas/:id"

          children=
          {
            <DetalleReceta  user={user}/>
          }

        />



        {user &&
          <>
            <Route exact path="/mispublicaciones"
              children={

                <ListadoRecetas type="mispublicaciones"
                  user={user}
                  searchRec={searchRec}
                  filtros={filtros}
                  onFilterChange={handleFilterChange}
                />
              }
            />
            <Route exact path="/favoritos"
              children={

                <ListadoRecetas type="favoritos"
                  user={user}
                  searchRec={searchRec}
                  filtros={filtros}
                  onFilterChange={handleFilterChange}

                />

              }
            />
            <Route exact path="/miperfil"
                   children={
                     <Perfil  type="miperfil"
                              user={user}
                              
                     />
                   }
            />
          </>
        }


        <Redirect to={{ pathname: '/' }} />



      </Switch>


    </Router>

  )

}

export default App;
