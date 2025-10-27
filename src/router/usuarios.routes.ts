import { Router } from 'express';
import * as usuariosController from '../controladores/usuario-controlador';
import { validarCrearUsuario } from '../middlewares/validar-usuario';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

router.get('/', usuariosController.obtenerUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.post('/',validarCrearUsuario, usuariosController.crearUsuario);
router.put('/:id',validarCrearUsuario, usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

export default router;