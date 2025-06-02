"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const token_router_1 = require("./routes/token.router");
const card_router_1 = require("./routes/card.router");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const db_init_1 = require("./config/db.init");
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
(0, db_init_1.initializeDatabase)();
app.use(body_parser_1.default.json());
app.use(auth_middleware_1.authMiddleware);
app.use('/tokens', token_router_1.tokenRouter);
app.use('/cards', card_router_1.cardRouter);
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
