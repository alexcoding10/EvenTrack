// src/config.ts
import * as dotenv from 'dotenv';

dotenv.config();

//Configuracion de base de datos

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
export const DB_USER = process.env.DB_USER || 'dam';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'eventrack';

//Configuracion del server
export const SERVER_PORT = process.env.PORT || 3000;

//Configuracion del rounds

export const SALT_ROUNDS = 15;