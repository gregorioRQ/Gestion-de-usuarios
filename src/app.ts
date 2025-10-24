
import express, { Application, Request, Response } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

import generalRoutes from "./router/general.routes";
import usuarioRoutes from  "./router/usuarios.routes";
import { manejoErrores } from "./middlewares/manejo-errores";

const app: Application = express();
const PORT = process.env.PORT || 4090;

app.use(express.json());
app.use(generalRoutes);
app.use("/usuarios",usuarioRoutes);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(manejoErrores);
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

module.exports = app;
