import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config/config";
import { User } from "../models/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true, // SOLO MIENTRAS ESTA EN DESARROLLO EN PRODUCCION PONER EN FALSE
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})