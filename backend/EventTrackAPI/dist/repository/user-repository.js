"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// src/repository/user-repository.ts
const data_source_1 = require("config/data-source"); // Asegúrate de que la ruta sea correcta
const user_1 = require("models/user"); // Asegúrate de que la ruta sea correcta
class UserRepository {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: { id }
            });
        });
    }
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create(userData);
            return yield this.repository.save(user);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({ order: { id: 'ASC' } });
        });
    }
}
exports.UserRepository = UserRepository;
UserRepository.repository = data_source_1.AppDataSource.getRepository(user_1.User);
