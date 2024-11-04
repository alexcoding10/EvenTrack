"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
// src/schemas/user-schema.ts
const zod_1 = require("zod");
// Definimos el esquema de validación para el usuario
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(), // opcional porque se generará automáticamente
    email: zod_1.z.string().email(), // debe ser un correo electrónico válido
    password: zod_1.z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[\W_]/, { message: "La contraseña debe contener al menos un carácter especial." })
        .regex(/^\S*$/, { message: "La contraseña no debe contener espacios." }), // Asegurarse de que no haya espacios
    name: zod_1.z.string().optional(), // opcional
    age: zod_1.z.number().int().optional(), // opcional
    sex: zod_1.z.enum(['masculino', 'femenino', 'otro'], {
        errorMap: () => ({ message: "El sexo debe ser 'masculino' , 'femenino' u 'otro." })
    }).optional(),
    job_position: zod_1.z.string().optional(), // opcional
    company: zod_1.z.string().optional(), // opcional
    date_registered: zod_1.z.date().optional() // opcional, se generará automáticamente
});
