/* Se importar los recursos necesarios */
import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/* se remueven las cookies guardadas para el cierre de sesión */
class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    /* se muestran los mensajes en el console.log para identificar al usuario que ha iniciado sesión */
    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido_paterno: '+cookies.get('apellido_paterno'));
        console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('username: '+cookies.get('username'));

        /* Se retorna una visualización de la pantalla una vez el usuario esté logueado */
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Esta es la pantalla del usuario logueado</h1>
                    <br />
                    <button className="btn-custom" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                </div>
            </div>
        );
    }
}

export default Menu;