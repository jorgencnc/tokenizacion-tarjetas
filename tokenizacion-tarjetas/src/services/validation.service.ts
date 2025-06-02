import { CardData } from '../models/card.model';
import { isValidLuhn } from '../utils/luhn.algorithm';
import { isValidEmail } from '../utils/email.validator';

export class ValidationService {
    validateCardData(cardData: CardData): void {
        if (!cardData.card_number || cardData.card_number.toString().length < 13 || cardData.card_number.toString().length > 16) {
            throw new Error('Invalid card number length');
        }

        if (!isValidLuhn(cardData.card_number.toString())) {
            throw new Error('Invalid card number (Luhn check failed)');
        }

        if (!cardData.cvv || (cardData.cvv.toString().length !== 3 && cardData.cvv.toString().length !== 4)) {
            throw new Error('Invalid CVV length');
        }

        const month = parseInt(cardData.expiration_month);
        if (isNaN(month) || month < 1 || month > 12) {
            throw new Error('Invalid expiration month');
        }

        const currentYear = new Date().getFullYear();
        const year = parseInt(cardData.expiration_year);
        if (isNaN(year) || year < currentYear || year > currentYear + 5) {
            throw new Error('Invalid expiration year');
        }

        if (!isValidEmail(cardData.email)) {
            throw new Error('Invalid email domain');
        }
    }
}

export const validationService = new ValidationService();
