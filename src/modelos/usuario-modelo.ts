/**
 * define el modelo a mapear en la base de datos
 * con sequelize.
 *
 * sequelize crear automaticamente el campo id como clave primaria si no se
 * especifica de lo contrario.
 */

import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("db_usuarios", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
});

interface UsuarioAtributos {
  id?: number;
  nombre: string;
  email: string;
  contraseña: string;
}

class Usuario extends Model<UsuarioAtributos> implements UsuarioAtributos {
  public id?: number | undefined;
  public nombre!: string;
  public email!: string;
  public contraseña!: string;
}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Usuarios",
    timestamps: false
  }
);

//sincroniza el modelo con la base de datos (crea la tabla si no existe)
sequelize.sync();

export default Usuario;
