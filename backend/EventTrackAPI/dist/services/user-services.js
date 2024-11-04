"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getAllUser = void 0;
const user_repository_1 = require("repository/user-repository");
const user_schema_1 = require("schema/user-schema.");
const zod_1 = require("zod");
// Controlador para obtener todos los usuarios
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos los usuarios y los ordena por ID
        const users = yield user_repository_1.UserRepository.findAll();
        // Devuelve la lista de usuarios como respuesta
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar que el ID sea un número válido
    if (isNaN(Number(id))) {
        res.status(400).json({ message: 'ID debe ser un número válido' });
        return;
    }
    try {
        // Busca el usuario por ID
        const user = yield user_repository_1.UserRepository.findById(Number(id));
        if (!user) {
            // Si no se encuentra el usuario, retorna un 404
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Devuelve el usuario encontrado como respuesta
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        // Devuelve un error genérico por el momento
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validamos el cuerpo de la solicitud
        const validatedUser = user_schema_1.UserSchema.parse(req.body);
        // guardamos el nuevo usuario en la base de datos
        const newUser = yield user_repository_1.UserRepository.createUser(validatedUser);
        //devuelvo una respuesta exitosa
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Si es un error de Zod, enviamos un 400 con los errores de validación
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return;
        }
        else {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
            return;
        }
    }
});
exports.createUser = createUser;
