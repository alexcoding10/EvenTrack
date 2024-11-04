// src/repository/user-repository.ts
import { AppDataSource } from "../config/data-source"; // Asegúrate de que la ruta sea correcta
import { User } from "../models/user"; // Asegúrate de que la ruta sea correcta
import { Repository } from "typeorm";

export class UserRepository {
    private static repository: Repository<User> = AppDataSource.getRepository(User);

    static async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({
            where: { id }
        });
    }

    static async createUser(userData: User): Promise<User> {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    static async findAll():Promise<User[]> {
        return await this.repository.find({order:{id:'ASC'}})
    }
    // Otros métodos para manejar usuarios
    // Por ejemplo, puedes agregar métodos para actualizar o eliminar usuarios
}
