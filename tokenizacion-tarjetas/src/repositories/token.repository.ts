// src/repositories/token.repository.ts
import Token from '../models/token.model';
import { CardData } from '../models/card.model';

const EXPIRATION_TIME_MINUTES = 15;

class TokenRepository {
  async save(token: string, cardData: CardData): Promise<void> {
    const expiresAt = new Date(Date.now() + EXPIRATION_TIME_MINUTES * 60 * 1000);

    await Token.upsert({
      token,
      cardData: JSON.stringify(cardData),
      expiresAt,
    });
  }

  async get(token: string): Promise<CardData | null> {
    const record = await Token.findOne({ where: { token } });
    if (!record) return null;

    if (record.expiresAt < new Date()) {
      await Token.destroy({ where: { token } });
      return null;
    }

    return record.cardData as CardData;
  }
}

export const tokenRepository = new TokenRepository();
