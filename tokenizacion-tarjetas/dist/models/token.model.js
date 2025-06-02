"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Token.ts
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
class Token extends sequelize_1.Model {
}
Token.init({
    token: {
        type: sequelize_1.DataTypes.STRING(16),
        primaryKey: true
    },
    cardData: {
        type: sequelize_1.DataTypes.JSON,
        field: 'card_data'
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'expires_at'
    }
}, {
    sequelize: db_config_1.sequelize,
    tableName: 'tokens',
    timestamps: true
});
exports.default = Token;
