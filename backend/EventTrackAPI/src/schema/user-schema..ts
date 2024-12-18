// src/schemas/user-schema.ts
import { z } from 'zod';

// Definimos el esquema de validación para el usuario
export const UserSchema = z.object({
    id: z.number().int().optional(), // opcional porque se generará automáticamente
    email: z.string().email(), // debe ser un correo electrónico válido
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[\W_]/, { message: "La contraseña debe contener al menos un carácter especial." })
        .regex(/^\S*$/, { message: "La contraseña no debe contener espacios." }), // Asegurarse de que no haya espacios
    name: z.string().optional(), // opcional
    age: z.number().int().optional(), // opcional
    sex: z.enum(['masculino', 'femenino','otro'], { 
        errorMap: () => ({ message: "El sexo debe ser 'masculino' , 'femenino' u 'otro." }) 
    }).optional(), 
    job_position: z.string().optional(), // opcional
    company: z.string().optional(), // opcional
    date_registered: z.date().optional() // opcional, se generará automáticamente
});



export const userSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      password: { type: 'string' },
      name: { type: 'string' },
      age: { type: 'integer' },
      sex: { type: 'string' },
      job_position: { type: 'string' },
      company: { type: 'string' },
      date_registered: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'email', 'password'],
  };

  export const userCreateSchema = {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      name: { type: 'string' },
      age: { type: 'integer' },
      sex: { type: 'string' },
      job_position: { type: 'string' },
      company: { type: 'string' },
    },
    required: [ 'email', 'password','name','age','sex','job_position','company'],
  };