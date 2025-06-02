// tests/token.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { sequelize } from '../src/config/db.config';
import { Merchant } from '../src/models/Merchant';
import Token from '../src/models/token.model';

describe('Token API', () => {
  let testMerchant: any;
  let testToken: string;

  const validCardData = {
    card_number: '4111111111111111',
    cvv: '123',
    expiration_month: '12',
    expiration_year: '2025',
    email: 'jorge.neciosup.casas@gmail.com'
  };

  // Datos antes de todas las pruebas
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Recrear tablas
    
    // Crear merchant de prueba
    testMerchant = await Merchant.create({
      name: 'Test Merchant',
      api_key: 'testkey123' // Debe coincidir con el header public-key
    });
  });

  // Limpiar después de todas las pruebas
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /tokens', () => {
    it('debe crear un token con datos válidos', async () => {
      const response = await request(app)
        .post('/tokens')
        .set('public-key', testMerchant.api_key)
        .send(validCardData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.token).toHaveLength(16); // 16 bytes = 32 chars hex
      
      // Guardar el token para pruebas posteriores
      testToken = response.body.token;
    });

    it('debe rechazar si falta public-key', async () => {
      const response = await request(app)
        .post('/tokens')
        .send(validCardData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('debe rechazar datos de tarjeta inválidos', async () => {
      const invalidData = {
        ...validCardData,
        card_number: '1234' // Número inválido
      };

      const response = await request(app)
        .post('/tokens')
        .set('public-key', testMerchant.api_key)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /cards/:token', () => {
    it('debe devolver los datos de la tarjeta sin CVV', async () => {
      const response = await request(app)
        .get(`/cards/${testToken}`)
        .set('public-key', testMerchant.api_key);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('card_number');
      expect(response.body).toHaveProperty('expiration_month');
      expect(response.body).toHaveProperty('expiration_year');
      expect(response.body).toHaveProperty('email');
      expect(response.body).not.toHaveProperty('cvv'); // CVV no debe estar en la respuesta
    });

    it('debe devolver 404 para token no existente', async () => {
      const fakeToken = 'a1b2c3d4e5f6g7h8a1b2c3d4e5f6g7h8';
      
      const response = await request(app)
        .get(`/cards/${fakeToken}`)
        .set('public-key', testMerchant.api_key);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('debe rechazar si falta public-key', async () => {
      const response = await request(app)
        .get(`/cards/${testToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('debe rechazar token con formato inválido', async () => {
      const response = await request(app)
        .get('/cards/token-invalido')
        .set('public-key', testMerchant.api_key);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Expiración de tokens', () => {
    it('debe rechazar token expirado', async () => {
      // Crear un token que ya expiró
      const expiredToken = await Token.create({
        token: 'expired1234567890expired1234567890',
        cardData: JSON.stringify(validCardData),
        expiresAt: new Date(Date.now() - 10000) // Hace 10 segundos
      });

      const response = await request(app)
        .get(`/cards/${expiredToken.token}`)
        .set('public-key', testMerchant.api_key);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Token no encontrado o ha expirado');
    });
  });
});