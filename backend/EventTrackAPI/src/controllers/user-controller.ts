
import { createUser, getAllUser, getUserById } from "../services/user-services";
import { Router } from "express";

//intancia del Router para usuario

const router = Router()

router.get('/users',getAllUser) //obtener todos los usuarios

router.post('/user',createUser) //crear un usuario

router.get('/user/:id',getUserById)

export default router