"use strict";
/**
 * punto de entrada de la app.
 * configura express y define la ruta principal
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controlador_1 = __importDefault(require("./controladores/usuario-controlador"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/usuarios", usuario_controlador_1.default);
app.listen(port, () => {
    console.log(`SERVIDOR ESCUCHANDO EN http://localhost:${port}`);
});
