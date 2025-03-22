"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_servicio_1 = __importDefault(require("../servicios/usuarios-servicio"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield usuarios_servicio_1.default.crearUsuario(req.body);
    res.status(201).json({ id });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuarios_servicio_1.default.obtenerUsuarios();
    res.json(usuarios);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuarios_servicio_1.default.obtenerUsuarioPorId(parseInt(req.params.id));
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).send("Usuario no encotrado");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuarios_servicio_1.default.obtenerUsuarioPorId(parseInt(req.params.id));
    if (usuario) {
        usuarios_servicio_1.default.eliminarUsuario(usuario.id);
        res.send("Usuario eliminado.");
    }
    else {
        res.status(404).send("Usuario no encotrado");
    }
}));
exports.default = router;
