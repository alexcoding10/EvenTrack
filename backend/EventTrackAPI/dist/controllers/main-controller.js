"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user-controller"));
/**
 * Router principal del cual saldran todas los router
 * de esta forma jerarquizamos y dividimos mejor, por lo que
 * sera mas facil encontrar errores.
 */
//Crear la instancia del router principal
const router = (0, express_1.Router)();
//router para usuarios
router.use(user_controller_1.default);
exports.default = router;
