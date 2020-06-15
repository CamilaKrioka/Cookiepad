import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';


export default props => {

  const [recetaName, setRecetaName] = useState('');
  const [recetaIngredientes, setRecetaIngredientes] = useState('');
  const [recetaPuntuacion, setRecetaPuntuacion] = useState('');
  const [recetaImage, setRecetaImage] = useState('');
  const [previewRecetaImage, setPreviewRecetaImage] = useState('');
  const [recetaCategory, setRecetaCategory] = useState('');
  const [categorias, setCategorias] = useState([{ id: '', nombre: 'Todas' }]);
  const[modos, setModos] = useState( [ {id: '', nombre: 'Todas' } ] );
  const[selectModo, setSelectModo] = useState('' );


  useEffect(() => {
    fetch('http://localhost:8080/categorias').then(
      response => response.json()
    ).then(
      dataCategorias => {
        setCategorias(dataCategorias);
      }
    )
  }, [])
  const categoriasOptions = () => {
    let categories = categorias.map(categoria => {
      return (
        <option value={categoria.id}>
          {categoria.nombre}
        </option>
      )
    })

    return categories;
  }

  useEffect( () =>{
    fetch('http://localhost:8080/modos').then(
     response => response.json()
    ).then(
        dataModos =>{
           setModos(dataModos);
        }
    )
},[])

const modosOptions = ()=>{
    let selectModo= modos.map( modo =>{
        return(
            <option value={modo.id}>
                    {modo.nombre}
            </option>
        )
    } )
    
    return selectModo;
}
  const handleModoChange = event => {
    setSelectModo(event.target.value);
  }

  const handleCategoryChange = event => {
    setRecetaCategory(event.target.value);
  }

  const handleRecetaNombre = (event) => {
    setRecetaName(event.target.value);
  }

  const handleRecetaIngredientes = (event) => {
    setRecetaIngredientes(event.target.value);
  }

  const handleRecetaPuntuacion = (event) => {
    setRecetaPuntuacion(event.target.value);
  }

  const handleRecetaImageChange = (event) => {
    setRecetaImage(event.target.files[0]);

    setPreviewRecetaImage(URL.createObjectURL(event.target.files[0]))
  }



  const handleSave = () => {

    const formData = new FormData();
    formData.append('recetaName', recetaName);
    formData.append('recetaIngredientes', recetaIngredientes);
    //formData.append('recetaUsuario', recetaUsuario);
    formData.append('recetaPuntuacion', recetaPuntuacion);
    formData.append('recetaImage', recetaImage);
    formData.append('selectModo', selectModo);
    formData.append('recetaCategory', recetaCategory);

    let url = 'http://localhost:8080/recetas';
    let method = 'POST';

    if (props.idReceta) {
      url += '/' + props.idReceta;
      method = 'PUT';
    }

    fetch(url, {
      method: method,
      body: formData,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {

        if (data.status === 'ok') {
          props.onRecetaSaved(data.message);
        }
        else {
          Swal.fire({
            text: data.message,
            icon: 'error'
          })

        }

      })
      .catch(error => {
        console.log('Error');
      })
  }


  useEffect(
    () => {
      if (props.idReceta) {

        fetch(`http://localhost:8080/recetas/` + props.idReceta).then(
          response => response.json()
        ).then(
          data => {

            setRecetaName(data.nombre);
            setRecetaIngredientes(data.ingredientes);
            setRecetaPuntuacion(data.puntuacion);
            setRecetaImage('');
            setPreviewRecetaImage(data.imagen);
            setSelectModo(data.modo);
            setRecetaCategory(data.categoria);
          }

        )
      } else {
        setRecetaName('');
        setRecetaIngredientes('');
        setRecetaPuntuacion('');
        setRecetaImage('');
        setPreviewRecetaImage('');
        setSelectModo('');
        setRecetaCategory('');

      }
    }, [props.idReceta]
  )


  return (

    <Modal show={props.show} onHide={props.handleHide}>

      <Modal.Header closeButton>
        <Modal.Title>Publicacion</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control type="text"
              value={recetaName}
              onChange={handleRecetaNombre}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control type="text"
              value={recetaIngredientes}
              onChange={handleRecetaIngredientes}
            />
          </Form.Group>


          <Form.Group>
            <Form.Label>Puntuacion</Form.Label>
            <Form.Control type="text"
              value={recetaPuntuacion}
              onChange={handleRecetaPuntuacion}
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Modos de coccion</Form.Label>
            <Form.Control style={{ cursor: "pointer" }} as="select"
              onChange={handleModoChange}
              value={selectModo}
            >

              {modosOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Categorias</Form.Label>
            <Form.Control style={{ cursor: "pointer" }} as="select"
              onChange={handleCategoryChange}
              value={recetaCategory}>
              {categoriasOptions()}

            </Form.Control>
          </Form.Group>


          <Form.Group className="d-flex justif-content-center">
            {previewRecetaImage &&
              <img style={{ height: "25vh" }} src={previewRecetaImage} />
            }
          </Form.Group>
         
          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file"
              onChange={handleRecetaImageChange}
            />
          </Form.Group>
        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">
          Cancelar
            </Button>

        <Button variant="dark"
          onClick={handleSave}
        >
          Guardar

            </Button>
      </Modal.Footer>



    </Modal>
  )
}
