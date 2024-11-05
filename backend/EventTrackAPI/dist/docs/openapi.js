"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openapiDocument = void 0;
const ts_json_schema_generator_1 = require("ts-json-schema-generator"); // Importa createGenerator
// Configuración del generador de esquemas
const generator = (0, ts_json_schema_generator_1.createGenerator)({
    path: './src/models/user.ts', // Ruta al archivo que contiene el modelo User
    tsconfig: './tsconfig.json', // Ruta a tu archivo tsconfig
    type: 'User' // Nombre del tipo que quieres convertir a JSON Schema
});
// Genera el esquema JSON a partir del modelo de TypeScript
const userSchema = generator.createSchema('User');
// Define el objeto de especificación OpenAPI utilizando el tipo OpenAPIV3.Document
exports.openapiDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Mi API Documentada con OpenAPI',
        version: '1.0.0',
        description: 'Documentación de la API creada con TypeScript y OpenAPI (Swagger)'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    paths: {
        '/users': {
            get: {
                summary: 'Obtiene todos los usuarios',
                responses: {
                    '200': {
                        description: 'Lista de usuarios',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            User: userSchema // Asigna el esquema generado automáticamente
        }
    }
};
