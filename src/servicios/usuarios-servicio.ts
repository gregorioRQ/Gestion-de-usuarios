import usuarioRepositorio from "../repositorios/usuario-repositorio";
import UsuarioAtributos from "../modelos/usuario-modelo";
import Usuario from "../modelos/usuario-modelo";

async function crearUsuario(usuario: UsuarioAtributos): Promise<number> {
  if(await usuarioRepositorio.obtenerUsuarioPorEmail(usuario.email)) {
    throw new Error("El email ya está en uso");
  }
  return usuarioRepositorio.crearUsuario(usuario);
}

async function obtenerUsuarioPorEmail(email: string): Promise<Usuario>{
  const usuario = await usuarioRepositorio.obtenerUsuarioPorEmail(email);
  if(!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
}

async function obtenerUsuarios(): Promise<any> {
  return usuarioRepositorio.obtenerUsuarios();
}

async function obtenerUsuarioPorId(id: number): Promise<any> {
  if(typeof id !== 'number' || isNaN(id) || id <= 0 || !Number.isInteger(id)) {
  throw new Error("ID inválido");
}
  return usuarioRepositorio.obtenerUsuarioPorId(id);
}

async function actualizarUsuario(
  id: number,
  usuario: UsuarioAtributos
): Promise<boolean> {

  if(typeof id !== 'number' || isNaN(id) || id <= 0 || !Number.isInteger(id)) {
  throw new Error("ID inválido");
}
  if(!usuario || typeof usuario !== 'object') {
  throw new Error("Usuario inválido");
}
  return usuarioRepositorio.actualizarUsuario(id, usuario);
}

async function actualizarUsuariopParcial(
  id: number,
  usuario: Partial<UsuarioAtributos>
): Promise<boolean> {
  return usuarioRepositorio.actualizarUsuarioParcial(id, usuario);
}

async function eliminarUsuario(id: number): Promise<boolean> {
  if(typeof id !== 'number' || isNaN(id) || id <= 0 || !Number.isInteger(id)) {
  throw new Error("ID inválido");
}
  return usuarioRepositorio.eliminarUsuario(id);
}
export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  actualizarUsuariopParcial,
  eliminarUsuario,
};
