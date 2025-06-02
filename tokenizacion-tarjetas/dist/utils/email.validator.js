"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
/**
 * Valida que el email tenga un dominio permitido
 * @param email Email a validar
 * @returns boolean - true si el email tiene un dominio permitido
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    // Expresión regular para validar formato básico de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    // Extraer el dominio del email
    const domain = email.split('@')[1].toLowerCase();
    // Dominios permitidos según los requisitos
    const allowedDomains = [
        'gmail.com',
        'hotmail.com',
        'taqsay.com',
        'yahoo.es'
    ];
    return allowedDomains.includes(domain);
}
