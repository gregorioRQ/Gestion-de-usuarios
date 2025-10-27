import { Request, Response, NextFunction } from 'express';

export const manejoErrores = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  if (error.message === 'El email ya está en uso') {
    res.status(409).json({ error: error.message });
    return;
  }

  if(error.message === 'ID inválido') {
    res.status(400).json({ error: error.message });
    return;
  }

  if(error.message === "Usuario inválido") {
    res.status(400).json({ error: error.message });
    return;
  }

  // Error genérico
  res.status(500).json({ 
    error: 'Error interno del servidor' 
  });
};