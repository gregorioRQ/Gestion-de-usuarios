import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "API usuarios",
            version: "0.0.1"
        }
    },
    servers: [{
        url: "http://localhost:4090",
        descripcion: "Servidor de desarrollo"
    }],
    components:{
        schemas:{
            Usuario:{
                type: "object",
                required: ["id", "nombre"],
                properties: {
                    id:{
                        type: "integer",
                        description: "Id de usuario"
                    }
                },
                example:{
                    id: 2
                }
            },
            Error:{
                type: "object",
                properties: {
                    error:{
                        type: "string"
                    }
                }
            }
        }
    },

    apis: [
        path.join(__dirname, '../docs/*.yaml'),
        path.join(__dirname, "../router/*.ts")],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;