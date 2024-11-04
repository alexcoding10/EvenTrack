# Esquema de Validación con Zod

En este módulo, generaremos los esquemas de validación utilizando **Zod** para asegurar que todos los datos que ingresen a la base de datos sean correctos y cumplan con las expectativas del sistema. 

## ¿Qué es Zod?

Zod es una biblioteca de validación y esquema para TypeScript y JavaScript. Permite definir estructuras de datos y validaciones de forma declarativa y proporciona un enfoque sencillo para manejar errores y transformar datos.

## Objetivos del Esquema de Validación

- **Asegurar la integridad de los datos**: Validar que los datos cumplan con las reglas definidas antes de ser almacenados en la base de datos.
- **Mejorar la mantenibilidad**: Tener un esquema centralizado facilita las modificaciones futuras y mejora la legibilidad del código.
- **Manejo de errores**: Proporcionar respuestas claras y estructuradas en caso de que los datos no cumplan con las especificaciones.

## Ejemplo de Esquema de Validación

A continuación, se presenta un ejemplo de cómo crear un esquema de validación para un usuario utilizando Zod:

```typescript
import { z } from 'zod';

// Definimos el esquema para un usuario
const UserSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido").nonempty("El correo electrónico es requerido"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
    name: z.string().optional(),
    age: z.number().optional().min(0, "La edad debe ser un número positivo"),
    sex: z.enum(["masculino", "femenino"], "El sexo debe ser masculino o femenino").optional(),
    job_position: z.string().optional(),
    company: z.string().optional()
});

// Ejemplo de uso del esquema
const validateUser = (userData: any) => {
    try {
        UserSchema.parse(userData);
        console.log("Datos de usuario válidos:", userData);
    } catch (e) {
        console.error("Errores de validación:", e.errors);
    }
};

// Uso de la función de validación
validateUser({
    email: "juan.perez@example.com",
    password: "Contraseña123",
    name: "Juan Pérez",
    age: 30,
    sex: "masculino"
});
```