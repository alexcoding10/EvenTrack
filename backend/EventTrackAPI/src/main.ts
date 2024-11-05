import express from "express";

import { SERVER_PORT } from "./config/config";
import routerMain from "./controllers/main-controller";
import { AppDataSource } from "./config/data-source";
import swaggerUi from 'swagger-ui-express';
import { openapiDocument } from "./docs/openapi";

//instancia de Express
const app = express();

// middleware para parsear a JSON
app.use(express.json());

//entrada para el router
app.use('/api',routerMain);

//llamada al app source 
AppDataSource.initialize();

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

//inicia el servidor
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
  console.log(`[swagger]: Swagger docs available at http://localhost:${SERVER_PORT}/api-docs`);
});