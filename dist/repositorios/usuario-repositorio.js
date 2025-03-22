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
const usuario_modelo_1 = __importDefault(require("../modelos/usuario-modelo"));
function crearUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUsuario = yield usuario_modelo_1.default.create(usuario);
        return newUsuario.id;
    });
}
function obtenerUsuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_modelo_1.default.findAll();
    });
}
function obtenerUsuarioPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_modelo_1.default.findByPk(id);
    });
}
function actualizarUsuario(id, usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const [filasActualizadas] = yield usuario_modelo_1.default.update(usuario, {
            where: { id },
        });
        return filasActualizadas > 0;
    });
}
function eliminarUsuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const filasEliminadas = yield usuario_modelo_1.default.destroy({
            where: { id },
        });
        return filasEliminadas > 0;
    });
}
exports.default = {
    crearUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario,
};
