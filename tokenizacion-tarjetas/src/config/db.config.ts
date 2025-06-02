// config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql', // o 'postgres'
  host: process.env.DB_HOST || '31.220.97.42',
  username: process.env.DB_USER || 'app_soft',
  password: process.env.DB_PASSWORD || 'J0rge123',
  database: process.env.DB_NAME || 'card_tokenization',
  port: parseInt(process.env.DB_PORT || '3306'),
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});

export { sequelize };