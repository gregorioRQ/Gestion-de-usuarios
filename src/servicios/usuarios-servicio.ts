import usuarioRepositorio from "../repositorios/usuario-repositorio";
import UsuarioAtributos from "../modelos/usuario-modelo";

async function crearUsuario(usuario: UsuarioAtributos): Promise<number> {
  return usuarioRepositorio.crearUsuario(usuario);
}

async function obtenerUsuarios(): Promise<any> {
  return usuarioRepositorio.obtenerUsuarios();
}

async function obtenerUsuarioPorId(id: number): Promise<any> {
  return usuarioRepositorio.obtenerUsuarioPorId(id);
}

async function actualizarUsuario(
  id: number,
  usuario: UsuarioAtributos
): Promise<boolean> {
  return usuarioRepositorio.actualizarUsuario(id, usuario);
}

async function actualizarUsuariopParcial(
  id: number,
  usuario: Partial<UsuarioAtributos>
): Promise<boolean> {
  return usuarioRepositorio.actualizarUsuarioParcial(id, usuario);
}

async function eliminarUsuario(id: number): Promise<boolean> {
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
