import { generateToken } from '../utils/tokenGenerator';
import { tokenRepository } from '../repositories/token.repository';
import { CardData } from '../models/card.model';

class TokenService {
    async createToken(cardData: CardData): Promise<string> {
        const token = generateToken();
        await tokenRepository.save(token, cardData);
        return token;
    }
}

export const tokenService = new TokenService();