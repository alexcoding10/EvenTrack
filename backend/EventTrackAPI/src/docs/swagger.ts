import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SERVER_PORT } from '../config/config';
import { userSchema } from '../schema/user-schema.';


// Opciones de configuración para swagger-jsdoc
const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Mi API con Swagger',
        version: '1.0.0',
        description: 'Documentación de mi API creada con Express y TypeScript',
      },
      servers: [
        {
          url: `http://localhost:${SERVER_PORT}`,
        },
      ],
      components: { // agregar los schema
        schemas: {
          User: userSchema
        },
      },
    },
    apis: ['./src/controllers/*.ts'], // Ruta a los archivos donde están tus comentarios de Swagger
  };

// Generar el documento Swagger
const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
