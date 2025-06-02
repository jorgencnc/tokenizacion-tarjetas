"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationService = exports.ValidationService = void 0;
const luhn_algorithm_1 = require("../utils/luhn.algorithm");
const email_validator_1 = require("../utils/email.validator");
class ValidationService {
    validateCardData(cardData) {
        if (!cardData.card_number || cardData.card_number.toString().length < 13 || cardData.card_number.toString().length > 16) {
            throw new Error('Invalid card number length');
        }
        if (!(0, luhn_algorithm_1.isValidLuhn)(cardData.card_number.toString())) {
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
        if (!(0, email_validator_1.isValidEmail)(cardData.email)) {
            throw new Error('Invalid email domain');
        }
    }
}
exports.ValidationService = ValidationService;
exports.validationService = new ValidationService();
