import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

enum Role {

    ADMIN = 'admin',
    NORMAL = 'normal',

}


export class CreateUserDto {
    // Validación de nombre (string no vacío, entre 3 y 100 caracteres)
    @IsNotEmpty()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    name: string;
    
    // Validación de edad (debe ser un número)
    @IsNumber({}, { message: 'La edad debe ser un número' })
    age: number;

    // Validación de sexo (debe ser un número)
    @IsNumber({}, { message: 'El sexo debe ser un número' })
    sex: number;

    // Validación del rol (debe ser uno de los valores del enum Role)
    @IsOptional()
    @IsEnum(Role, { message: 'El rol debe ser uno de los siguientes valores: admin, normal' })
    role: Role;

    // Validación de correo electrónico
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    email: string;

    @IsString()
    @Length(8, 70, { message: 'El nombre debe tener entre 8 y 70 caracteres' })
    password:string;

    @IsNumber()
    @IsOptional() // Si el puesto de trabajo es opcional
    jobPostId: number;
  
    @IsNumber()
    @IsOptional() // Si la empresa es opcional
    companyId: number;
}
