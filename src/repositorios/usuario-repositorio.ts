import Usuario from "../modelos/usuario-modelo";
import UsuarioAtributos from "../modelos/usuario-modelo";

async function crearUsuario(usuario: UsuarioAtributos): Promise<number> {
  const newUsuario = await Usuario.create(usuario);
  return newUsuario.id!;
}

async function obtenerUsuarioPorEmail(email: string): Promise<Usuario | null>{
  return Usuario.findOne({ where: { email } });
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  return Usuario.findAll();
}

async function obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
  return Usuario.findByPk(id);
}

async function actualizarUsuario(
  id: number,
  usuario: UsuarioAtributos
): Promise<boolean> {
  const [filasActualizadas] = await Usuario.update(usuario, {
    where: { id },
  });
  return filasActualizadas > 0;
}

async function actualizarUsuarioParcial(
  id: number,
  usuario: Partial<UsuarioAtributos>
): Promise<boolean> {
  const [filasActualizadas] = await Usuario.update(usuario, {
    where: { id },
  });
  return filasActualizadas > 0;
}

async function eliminarUsuario(id: number): Promise<boolean> {
  const filasEliminadas = await Usuario.destroy({
    where: { id },
  });
  return filasEliminadas > 0;
}

export default {
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  actualizarUsuario,
  actualizarUsuarioParcial,
  eliminarUsuario,
  obtenerUsuarioPorEmail
};
