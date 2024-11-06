import { createUser, getAllUser, getUserById, loginUser } from "../services/user-services";
import { Router } from "express";

//intancia del Router para usuario
const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [User]
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
router.get('/users', getAllUser); //obtener todos los usuarios

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crear un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/user', createUser); //crear un usuario

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/user/:id', getUserById);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Logear un usuario
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: password123
 *     responses:
 *       200:
 *         description: Genera el login de un usuario pero aún no está implementada la sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUser'
 *       404:
 *         description: Login fallido
 */

router.post('/login',loginUser)

export default router;
