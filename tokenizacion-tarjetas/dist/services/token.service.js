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
exports.tokenService = void 0;
const tokenGenerator_1 = require("../utils/tokenGenerator");
const token_repository_1 = require("../repositories/token.repository");
class TokenService {
    createToken(cardData) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, tokenGenerator_1.generateToken)();
            yield token_repository_1.tokenRepository.save(token, cardData);
            return token;
        });
    }
}
exports.tokenService = new TokenService();
