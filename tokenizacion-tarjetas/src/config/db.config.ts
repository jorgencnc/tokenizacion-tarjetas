// config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql', // o 'postgres'
  host: process.env.DB_HOST || '31.220.2222',
  username: process.env.DB_USER || 'app',
  password: process.env.DB_PASSWORD || '123455',
  database: process.env.DB_NAME || 'card_tokenization',
  port: parseInt(process.env.DB_PORT || '3306'),
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});

export { sequelize };