"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = require("@services/userServices");
const express_1 = require("express");
//intancia del Router para usuario
const router = (0, express_1.Router)();
router.get('/users', userServices_1.getAllUser); //obtener todos los usuarios
router.post('/user', userServices_1.createUser); //crear un usuario
exports.default = router;
