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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
// src/repositories/token.repository.ts
const token_model_1 = __importDefault(require("../models/token.model"));
const EXPIRATION_TIME_MINUTES = 15;
class TokenRepository {
    save(token, cardData) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresAt = new Date(Date.now() + EXPIRATION_TIME_MINUTES * 60 * 1000);
            yield token_model_1.default.upsert({
                token,
                cardData: JSON.stringify(cardData),
                expiresAt,
            });
        });
    }
    get(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield token_model_1.default.findOne({ where: { token } });
            if (!record)
                return null;
            if (record.expiresAt < new Date()) {
                yield token_model_1.default.destroy({ where: { token } });
                return null;
            }
            return record.cardData;
        });
    }
}
exports.tokenRepository = new TokenRepository();
