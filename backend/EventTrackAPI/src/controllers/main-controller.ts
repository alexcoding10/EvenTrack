import { Router } from "express";
import userRouter from "./user-controller";
/**
 * Router principal del cual saldran todas los router
 * de esta forma jerarquizamos y dividimos mejor, por lo que
 * sera mas facil encontrar errores.
 */

//Crear la instancia del router principal
const router = Router()

//router para usuarios
router.use(userRouter)

export default router