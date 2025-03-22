"use strict";
/**
 * define el modelo a mapear en la base de datos
 * con sequelize.
 *
 * sequelize crear automaticamente el campo id como clave primaria si no se
 * especifica de lo contrario.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("api_usuarios", "root", "123456789", {
    host: "localhost",
    dialect: "mysql",
});
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "Usuarios",
});
//sincroniza el modelo con la base de datos (crea la tabla si no existe)
sequelize.sync();
exports.default = Usuario;
