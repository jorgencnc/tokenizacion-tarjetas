import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const publicKey = req.headers['public-key'] || req.headers['Public-Key'];
    
    if (!publicKey) {
        return res.status(401).json({ error: 'Public key is required' });
    }
    
    // Aquí iría la validación real contra la base de datos o servicio
    // Por simplicidad, asumimos que cualquier clave no vacía es válida
    next();
};