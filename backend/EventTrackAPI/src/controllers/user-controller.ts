
import { createUser, getAllUser, getUserById } from "../services/user-services";
import { Router } from "express";
import { User } from "../models/user";

//intancia del Router para usuario

const router = Router()


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Listar todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
router.get('/users',getAllUser) //obtener todos los usuarios

router.post('/user',createUser) //crear un usuario

router.get('/user/:id',getUserById)

export default router