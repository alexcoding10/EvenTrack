import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    // Validación de nombre (string no vacío, entre 3 y 100 caracteres)
    @IsNotEmpty()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    name: string;
    
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser una cadena de texto' })
    @Length(3, 255, { message: 'La descripcion debe tener entre 3 y 100 caracteres' })
    address: string;
}
