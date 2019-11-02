const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

const proyectosCtrl = require('../controllers/proyectosCtrl');
const tareasCtrl = require('../controllers/tareasCtrl');
const usuariosCtrl = require('../controllers/usuariosCtrl');
const authCtrl = require('../controllers/authCtrl');

module.exports = function() {
    router.get('/',
        authCtrl.usuarioAutenticado,
        proyectosCtrl.proyectosHome
    );
    router.get('/nuevo-proyecto',
        authCtrl.usuarioAutenticado,
        proyectosCtrl.formularioProyecto
    );
    router.post('/nuevo-proyecto',
        authCtrl.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosCtrl.nuevoProyecto
    );
    
    // Listar Proyecto
    router.get('/proyectos/:url',
        authCtrl.usuarioAutenticado,
        proyectosCtrl.proyectoPorUrl
    );

    // Actualizar el Proyecto
    router.get('/proyecto/editar/:id',
        authCtrl.usuarioAutenticado,
        proyectosCtrl.formularioEditar
    );
    router.post('/nuevo-proyecto/:id',
        authCtrl.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosCtrl.actualizarProyecto
    );
    
    // Eliminar Proyecto
    router.delete('/proyectos/:url',
        authCtrl.usuarioAutenticado,
        proyectosCtrl.eliminarProyecto
    );

    // Tareas
    router.post('/proyectos/:url',
        authCtrl.usuarioAutenticado,
        tareasCtrl.agregarTarea
    );
    router.patch('/tareas/:id',
        authCtrl.usuarioAutenticado,
        tareasCtrl.cambiarEstadoTarea
    );
    router.delete('/tareas/:id',
        authCtrl.usuarioAutenticado,
        tareasCtrl.eliminarTarea
    );

    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosCtrl.formCrearCuenta);
    router.post('/crear-cuenta', usuariosCtrl.crearCuenta);
    router.get('/confirmar/:correo', usuariosCtrl.confirmarCuenta)

    router.get('/iniciar-sesion', usuariosCtrl.formIniciarSesion)
    router.post('/iniciar-sesion', authCtrl.autenticarUsuario);

    router.get('/cerrar-sesion', authCtrl.cerrarSesion);

    // Reestablecer contraseña
    router.get('/reestablecer', usuariosCtrl.formReestablecerPassword);
    router.post('/reestablecer', authCtrl.enviarToken);
    router.get('/reestablecer/:token', authCtrl.validarToken);
    router.post('/reestablecer/:token', authCtrl.actualizarPassword)
    
    return router;
}
