import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export class Merchant extends Model {
  public id!: number;
  public name!: string;
  public api_key!: string;
}

Merchant.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  api_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  tableName: 'merchants',
  timestamps: true
});
