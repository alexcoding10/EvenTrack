// src/services/userServices.ts
import { Request, Response } from 'express'; 
import { User } from '../models/user'; 
import { UserRepository } from '../repository/user-repository'; 
import { UserSchema } from '../schema/user-schema.';
import { z } from 'zod';
import { LoginUserSchema } from '../schema/login-schema';
import { hashPassword, validatePassword } from './crypt-service';

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

//Obtener un usuario por ID
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

//Crear un usuario
export const createUser = async (req:Request , res:Response):Promise<void> => {

    try{
        //validamos el cuerpo de la solicitud
        const validatedUser = UserSchema.parse(req.body);
        //encriptar la contraseña
        // Encriptar la contraseña
        if (validatedUser.password) {
            validatedUser.password = await hashPassword(validatedUser.password); // Esperamos la promesa de hashPassword
        }
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

export const loginUser = async(req:Request,res:Response):Promise<void> =>{
    try {
        // Validamos el esquema del cuerpo de la solicitud
        const userLogin = LoginUserSchema.parse(req.body);
        
        // Ver si existe un usuario con ese email (esperar la promesa)
        const user = await UserRepository.findByEmail(userLogin.email);
    
        if (!user) {
          // Si el usuario no existe, devolvemos un error 404
          res.status(404).json({ message: `No se ha encontrado el email: ${userLogin.email}` });
          return;
        }
    
        // Comprobamos si la contraseña ingresada es correcta
        const isOK = await validatePassword(userLogin.password, user.password);
        if (!isOK) {
          // Si la contraseña es incorrecta, enviamos un error 401 (Unauthorized)
          res.status(401).json({ message: 'Contraseña incorrecta' });
          return;
        }
    
        // Si la autenticación es exitosa, se podría generar un token o devolver los datos del usuario
        //TODO: Ahora se envia el id por seguridad pero se puede enviar el usuario entero
        res.status(200).json({ message: 'Login exitoso', id_user:user.id });
      } catch (error) {
        console.error('Error en login:', error);
        if(error instanceof z.ZodError){
            // Si es un error de Zod, enviamos un 400 con los errores de validación
            res.status(400).json({ message: 'Error de validación', errors: error.errors });
            return
        }
        res.status(500).json({ message: 'Error interno del servidor' });
      }
}


  