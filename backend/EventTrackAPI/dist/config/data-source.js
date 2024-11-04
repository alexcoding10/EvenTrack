"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const user_1 = require("models/user");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: config_1.DB_PORT,
    username: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    synchronize: true, // SOLO MIENTRAS ESTA EN DESARROLLO EN PRODUCCION PONER EN FALSE
    logging: true,
    entities: [user_1.User],
    subscribers: [],
    migrations: [],
});
