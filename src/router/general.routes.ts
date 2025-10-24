import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Mensaje de bienvenida
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/', (req: Request, res: Response) => {
  res.json({ mensaje: 'Bienvenido a la API REST' });
});

export default router;