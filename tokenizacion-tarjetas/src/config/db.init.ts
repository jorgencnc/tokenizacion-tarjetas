// src/config/db.init.ts
import { sequelize } from './db.config';
import Token from '../models/token.model';
import { Merchant } from '../models/Merchant';

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');

    // Definir relaciones primero
    await import('../models/token.model');
    await import('../models/Merchant');

    // Sincronizar con force:true solo en test
    const syncOptions = process.env.NODE_ENV === 'test' 
      ? { force: true } 
      : { alter: true };

    await sequelize.sync(syncOptions);
    console.log('📦 Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:');
    console.error(error);
    if (process.env.NODE_ENV === 'test') {
      process.exit(1);
    }
  }
};