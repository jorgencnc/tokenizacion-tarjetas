// models/Token.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

class Token extends Model {
  public token!: string;
  public cardData!: object;
  public expiresAt!: Date;
}

Token.init({
  token: {
    type: DataTypes.STRING(16),
    primaryKey: true
  },
  cardData: {
    type: DataTypes.JSON,
    field: 'card_data'
  },
  expiresAt: {
    type: DataTypes.DATE,
    field: 'expires_at'
  }
}, {
  sequelize,
  tableName: 'tokens',
  timestamps: true
});

export default Token;