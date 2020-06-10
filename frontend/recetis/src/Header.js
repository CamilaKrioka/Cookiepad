import React from 'react';

function Header(props){

    console.log(props.nombreUsuario);

    return(

        <header>

        

            <div>

            <p>Encabezado de pagina de pagina</p>
            <p>{props.nombreUsuario}</p>

            </div>
        </header>
    )

}

export default Header;