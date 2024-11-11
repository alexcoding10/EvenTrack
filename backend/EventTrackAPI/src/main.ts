import express from "express";

import { SERVER_PORT } from "./config/config";
import routerMain from "./controllers/main-controller";
import { AppDataSource } from "./config/data-source";
import { swaggerSpec, swaggerUi } from "./docs/swagger";
import cors from 'cors';
//instancia de Express
const app = express();

// middleware para parsear a JSON
app.use(express.json());

app.use(cors()); // Enable CORS for all routes

//entrada para el router
app.use('/api',routerMain);
// Ruta de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//llamada al app source 
AppDataSource.initialize();



//inicia el servidor
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
  console.log(`[swagger]: Swagger docs available at http://localhost:${SERVER_PORT}/api-docs`);
});