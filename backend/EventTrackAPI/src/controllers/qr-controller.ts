import { Router } from "express";
import { qrgenerate } from "../services/qr-services";

const routerqr = Router()

/**
 * @swagger
 * /api/qr/generate:
 *   post:
 *     summary: Generate a QR code
 *     tags:
 *       - ["QR"] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: The data to encode in the QR code
 *                 example: "example data"
 *               expires:
 *                 type: string
 *                 description: The expiration time for the token (optional)
 *                 example: "1h"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *       400:
 *         description: Bad request
 */
routerqr.post("/generate", qrgenerate);


export default routerqr