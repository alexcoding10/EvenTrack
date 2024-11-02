# INFORMACIÓN DEL PROYECTO
- **Workframe**: Express.js
- **Lenguaje**: TypeScript
- **Dependencias**: 
  - **Nodemon**: Reinicio automático del servidor cuando hay un cambio.
  - **tsconfig-paths**: Permite crear rutas personalizadas para importaciones.
  - **tsc-alias**: Traduce las rutas de imports de TypeScript a JavaScript.
  - **dotenv**: Carga variables de entorno desde un archivo `.env`.

# INICIAR PROYECTO
Usa los scripts creados para iniciar el proyecto con el comando: 
```
npm run <nombreScript>
```
### Scripts Creados:
- **build**: Compila el proyecto, traduciéndolo de TypeScript a JavaScript.
- **start**: Inicia el proyecto.
- **dev**: Inicia el proyecto en modo desarrollo usando nodemon.

# CREAR UN NUEVO ALIAS PARA IMPORT
Para crear un nuevo alias, entra en `tsconfig.json` y añade un nuevo alias dentro de `paths`. Ejemplo:
```json
"paths": {
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"]
    }, 
```

