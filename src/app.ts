/**
 * punto de entrada de la app.
 * configura express y define la ruta principal
 */

import express, { Application, Request, Response } from "express";
import usuarioControlador from "./controladores/usuario-controlador";

const app: Application = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenido a la Api de gestion de usuarios.");
});

app.use(express.json());

app.use("/usuarios", usuarioControlador);

app.listen(port, () => {
  console.log(`SERVIDOR ESCUCHANDO EN http://localhost:${port}`);
});
