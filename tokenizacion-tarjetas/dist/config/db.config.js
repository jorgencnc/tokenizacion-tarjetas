"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// config/database.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql', // o 'postgres'
    host: process.env.DB_HOST || '3xxxx',
    username: process.env.DB_USER || 'xx',
    password: process.env.DB_PASSWORD || 'xx',
    database: process.env.DB_NAME || 'card_tokenization',
    port: parseInt(process.env.DB_PORT || '3306'),
    logging: false,
    define: {
        timestamps: true,
        underscored: true
    }
});
exports.sequelize = sequelize;
