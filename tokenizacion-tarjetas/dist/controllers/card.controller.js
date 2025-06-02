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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardData = void 0;
const card_service_1 = require("../services/card.service");
const getCardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (typeof token !== 'string' || token.length !== 16) {
            return res.status(400).json({ error: 'El token debe tener exactamente 16 caracteres' });
        }
        let cardData = yield card_service_1.cardService.getCardData(token);
        if (!cardData) {
            return res.status(404).json({ error: 'Token no encontrado o ha expirado' });
        }
        if (typeof cardData === 'string') {
            try {
                cardData = JSON.parse(cardData);
            }
            catch (e) {
                console.error('Error parsing cardData JSON:', e);
            }
        }
        const _a = cardData, { cvv } = _a, safeCardData = __rest(_a, ["cvv"]);
        return res.json(safeCardData);
    }
    catch (error) {
        console.error('Error en card.controller:', error);
        return res.status(500).json({ error: 'Error al obtener los datos de la tarjeta' });
    }
});
exports.getCardData = getCardData;
