import express, { Request, Response, Router } from "express";
import usuariosServicio from "../servicios/usuarios-servicio";
import UsuarioAtributos from "../modelos/usuario-modelo";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const id: number = await usuariosServicio.crearUsuario(req.body);
  res.status(201).json({ id });
});

router.get("/", async (req: Request, res: Response) => {
  const usuarios: UsuarioAtributos[] = await usuariosServicio.obtenerUsuarios();
  res.json(usuarios);
});

router.get("/:id", async (req: Request, res: Response) => {
  const usuario = await usuariosServicio.obtenerUsuarioPorId(
    parseInt(req.params.id)
  );
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encotrado");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const actualizado: boolean = await usuariosServicio.actualizarUsuario(
    parseInt(req.params.id),
    req.body
  );
  if (actualizado) {
    res.send("Usuario actualizado");
  } else {
    res.send("Usuario no encontrado");
  }
});

router.patch("/id:", async (req: Request, res: Response) => {
  const actualizadoParcial: boolean =
    await usuariosServicio.actualizarUsuariopParcial(
      parseInt(req.params.id),
      req.body
    );
  if (actualizadoParcial) {
    res.sendStatus(204);
  } else {
    res.status(404).send("Usuario no encontrado.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const usuario = await usuariosServicio.obtenerUsuarioPorId(
    parseInt(req.params.id)
  );
  if (usuario) {
    usuariosServicio.eliminarUsuario(usuario.id);
    res.send("Usuario eliminado.");
  } else {
    res.status(404).send("Usuario no encotrado");
  }
});

export default router;
