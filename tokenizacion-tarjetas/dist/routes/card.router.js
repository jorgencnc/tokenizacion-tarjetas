"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const express_1 = require("express");
const card_controller_1 = require("../controllers/card.controller");
const cardRouter = (0, express_1.Router)();
exports.cardRouter = cardRouter;
cardRouter.get('/:token', card_controller_1.getCardData);
