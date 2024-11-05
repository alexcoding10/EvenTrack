// src/services/userServices.ts
import { Request, Response } from 'express'; 
import { User } from '../models/user'; 
import { UserRepository } from '../repository/user-repository'; 
import { UserSchema } from '../schema/user-schema.';
import { z } from 'zod';

// Controlador para obtener todos los usuarios
export const getAllUser = async (req: Request, res: Response) => {
    try {
        // Busca todos los usuarios y los ordena por ID
        const users: User[] = await UserRepository.findAll();
        // Devuelve la lista de usuarios como respuesta
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    if (isNaN(Number(id))) {
        res.status(400).json({ message: 'ID debe ser un número válido' });
        return;
    }

    try {
        // Busca el usuario por ID
        const user: User | null = await UserRepository.findById(Number(id));

        if (!user) {
            // Si no se encuentra el usuario, retorna un 404
            res.status(404).json({ message: 'Usuario no encontrado' });
            return; 
        }

        // Devuelve el usuario encontrado como respuesta
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        // Devuelve un error genérico por el momento
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


export const createUser = async (req:Request , res:Response):Promise<void> => {

    try{
        //validamos el cuerpo de la solicitud
        const validatedUser = UserSchema.parse(req.body);
        // guardamos el nuevo usuario en la base de datos
        const newUser = await UserRepository.createUser(validatedUser);
        //devuelvo una respuesta exitosa
        res.status(201).json(newUser);
    }catch(error){
        if(error instanceof z.ZodError){
            // Si es un error de Zod, enviamos un 400 con los errores de validación
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return
        }else {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
            return
        }
    }
}
