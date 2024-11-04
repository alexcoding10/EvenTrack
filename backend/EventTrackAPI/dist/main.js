"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const main_controller_1 = __importDefault(require("./controllers/main-controller"));
//instancia de Express
const app = (0, express_1.default)();
// middleware para parsear a JSON
app.use(express_1.default.json());
//entrada para el router
app.use('/api', main_controller_1.default);
//inicia el servidor
app.listen(config_1.SERVER_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config_1.SERVER_PORT}`);
});
