import express, { NextFunction, Request, Response } from "express";
import usuariosServicio from "../servicios/usuarios-servicio";
import UsuarioAtributos from "../modelos/usuario-modelo";


export const crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id: number = await usuariosServicio.crearUsuario(req.body);
  res.status(201).json({ id });
  }catch(error){
    next(error);
  }
  
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
  const usuarios: UsuarioAtributos[] = await usuariosServicio.obtenerUsuarios();
  res.json(usuarios);
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  const usuario = await usuariosServicio.obtenerUsuarioPorId(
    parseInt(req.params.id)
  );
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encotrado");
  }
};

export const actualizarUsuario = async (req: Request, res: Response, next: NextFunction) => {
  const actualizado: boolean = await usuariosServicio.actualizarUsuario(
    parseInt(req.params.id),
    req.body
  );
  if (actualizado) {
    res.send("Usuario actualizado");
  } else {
    res.send("Usuario no encontrado");
  }
};

export const actualizarUsuariopParcial = async (req: Request, res: Response) => {
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
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const usuario = await usuariosServicio.obtenerUsuarioPorId(
    parseInt(req.params.id)
  );
  if (usuario) {
    usuariosServicio.eliminarUsuario(usuario.id);
    res.send("Usuario eliminado.");
  } else {
    res.status(404).send("Usuario no encotrado");
  }
};

