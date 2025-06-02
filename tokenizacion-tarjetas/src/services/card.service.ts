import { tokenRepository } from '../repositories/token.repository';
import { CardData } from '../models/card.model';

class CardService {
    async getCardData(token: string): Promise<CardData | null> {
        return tokenRepository.get(token);
    }
}

export const cardService = new CardService();
