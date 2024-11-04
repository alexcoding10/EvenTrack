import express from "express";

import { SERVER_PORT } from "./config/config";
import routerMain from "./controllers/main-controller";


//instancia de Express
const app = express();

// middleware para parsear a JSON
app.use(express.json())

//entrada para el router
app.use('/api',routerMain)

//inicia el servidor
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
});