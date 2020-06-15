import React, {useState, useEffect, useRef} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default props =>{

    const[categorias, setCategorias] = useState( [ {id: '', nombre: 'Todas' } ] );
    const[modos, setModos] = useState( [ {id: '', nombre: 'Todas' } ] );
    
   
    const categoriaRef = useRef ('null');
    const modoRef = useRef ('null');
    const ordenRef = useRef ('null');

    

    useEffect( () =>{
        fetch('http://localhost:8080/categorias').then(
         response => response.json()
        ).then(
            dataCategorias =>{
               setCategorias(dataCategorias);
            }
        )
 },[])
  
    const categoriasOptions = ()=>{
        let categories = categorias.map( categoria =>{
            return(
                <option value={categoria.id}>
                    {categoria.nombre}
                </option>
            )
        } )
        categories.unshift( <option value=''>
                             Todas
                            </option>);
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
        let modosCoccion = modos.map( modo =>{
            return(
                <option value={modo.id}>
                    {modo.nombre}
                </option>
            )
        } )
        modosCoccion.unshift( <option value=''>
                                Todos
                              </option>)
        return modosCoccion;
    }

    const handleFilterChange = ()=>{

        props.onFilterChange(
            {
                categoria : categoriaRef.current.value,
                modos : modoRef.current.value,
                orden : ordenRef.current.value
            }
        )
        
    }
     
    

    return(
        <Row style={ { backgroundColor : "#F9E79F" } } className="my-3 justify-content-center m-0  p-3">

            <Col xs={12} md={11} lg={8}>

            <Form>
                  <Row>
                  <Col xs={5} md={4} >
                    <Form.Group>
                        <Form.Label>Categorias</Form.Label>
                        <Form.Control style={{cursor: "pointer"}}  as= "select"
                                      onChange={handleFilterChange}
                                      ref={categoriaRef}>
                            {categoriasOptions()}

                        </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={5} md={4}>
                  <Form.Group >
                        <Form.Label>Modos de coccion</Form.Label>
                        <Form.Control style={{cursor: "pointer"}}  as= "select"
                                      onChange={handleFilterChange}
                                      ref={modoRef}>
                                      
                            {modosOptions()}
                        </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={5} md={4}>
                  <Form.Group>
                        <Form.Label >Puntuacion</Form.Label>
                        <Form.Control style={{cursor: "pointer"}}  as= "select"
                                      onChange={handleFilterChange}
                                      ref={ordenRef}
                         >
                            
                            <option value="menor_puntuacion">Menor puntuacion</option>
                            <option value="mayor_puntuacion">Mayor puntuacion</option>

                        </Form.Control>
                    </Form.Group>
                  </Col>
                  </Row>
                  


            </Form>

            </Col>

        </Row>

    )

}
