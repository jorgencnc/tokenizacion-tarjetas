"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLuhn = isValidLuhn;
/**
 * Implementación del algoritmo de Luhn para validar números de tarjeta de crédito
 * @param cardNumber Número de tarjeta a validar
 * @returns boolean - true si el número es válido según Luhn
 */
function isValidLuhn(cardNumber) {
    // Eliminar espacios y caracteres no numéricos
    const cleaned = cardNumber.replace(/\D/g, '');
    // Verificar que el número no esté vacío y sea numérico
    if (!cleaned || !/^\d+$/.test(cleaned)) {
        return false;
    }
    let sum = 0;
    let shouldDouble = false;
    // Recorrer los dígitos de derecha a izquierda
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit = (digit % 10) + 1;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}
