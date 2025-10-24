import { Request, Response, NextFunction } from "express";

export const validarCrearUsuario = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {  // ← Agregar tipo de retorno void
  const { nombre, email, contraseña } = req.body;

  if (!nombre?.trim() || !email?.trim() || !contraseña?.trim()) {
    res.status(400).json({  // ← Sin 'return'
      error: "Todos los campos son requeridos" 
    });
    return;  // ← 'return' vacío para detener la ejecución
  }

  if (!email.includes('@')) {
    res.status(400).json({ error: "Email inválido" });
    return;  // ← 'return' vacío
  }

  // valida que email no sea muy largo
  if(email.length > 100) {
    res.status(400).json({ error: "Email demasiado largo" });
    return;
  }

  // valida que nombre no sea muy largo
  if(nombre.length > 50) {
    res.status(400).json({ error: "Nombre demasiado largo" });
    return;
  }

  // valida que contraseña tenga al menos 9 caracteres, una mayúscula y un número
  if(contraseña.length < 9 || !/[A-Z]/.test(contraseña) || !/[0-9]/.test(contraseña)) {
    res.status(400).json({ error: "La contraseña debe tener al menos 9 caracteres, una mayúscula y un número" });
    return;
  }

  next(); // Si todo está bien, continúa al controlador
};