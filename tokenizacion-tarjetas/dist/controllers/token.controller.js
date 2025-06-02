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
exports.getTokenData = exports.createToken = void 0;
const token_repository_1 = require("../repositories/token.repository");
const crypto_1 = __importDefault(require("crypto"));
const createToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = crypto_1.default.randomBytes(8).toString('hex');
        yield token_repository_1.tokenRepository.save(token, req.body);
        res.status(201).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar token' });
    }
});
exports.createToken = createToken;
const getTokenData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield token_repository_1.tokenRepository.get(req.params.token);
        if (!data)
            return res.status(404).json({ error: 'Token inválido o expirado' });
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            }
            catch (e) {
                console.error('Error parsing cardData JSON:', e);
            }
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del token' });
    }
});
exports.getTokenData = getTokenData;
