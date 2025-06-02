"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Merchant = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
class Merchant extends sequelize_1.Model {
}
exports.Merchant = Merchant;
Merchant.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    api_key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: db_config_1.sequelize,
    tableName: 'merchants',
    timestamps: true
});
