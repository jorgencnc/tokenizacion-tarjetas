"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const publicKey = req.headers['public-key'] || req.headers['Public-Key'];
    if (!publicKey) {
        return res.status(401).json({ error: 'Public key is required' });
    }
    // Aquí iría la validación real contra la base de datos o servicio
    // Por simplicidad, asumimos que cualquier clave no vacía es válida
    next();
};
exports.authMiddleware = authMiddleware;
