/* Se importar los recursos necesarios */
import React, { Component } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

/* Se establece la ruta que contiene la base de datos y se guardan los cookies */
const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();


/* Se establece el estado inicial de los campos de texto */
class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    /* Se desarrolla la lógica de inicio de sesión en base a los registros importados de la base de datos */
    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                swal (`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";

            /* Mostramos en pantalla una alerta para informar al usuario si los datos no son correctos */
            }else{
                swal ({
                    title: "No se ha podido iniciar sesión",
                    text: "El usuario o la contraseña no son correctos",
                    icon: "error",
                    button: "Cerrar",
                    dangerMode: true
                })
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }

    /* Se renderiza la pantalla de inicio de sesión con el formulario de ingreso */
    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Inicio de sesión</h1>
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn-custom" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;