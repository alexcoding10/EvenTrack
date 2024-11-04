"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = require("services/user-services");
const express_1 = require("express");
//intancia del Router para usuario
const router = (0, express_1.Router)();
router.get('/users', user_services_1.getAllUser); //obtener todos los usuarios
router.post('/user', user_services_1.createUser); //crear un usuario
router.get('/user/:id', user_services_1.getUserById);
exports.default = router;
