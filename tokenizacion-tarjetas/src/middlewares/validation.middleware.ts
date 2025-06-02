import { Request, Response, NextFunction } from 'express';
import { validationService } from '../services/validation.service';
import { CardData } from '../models/card.model';

export const validateTokenRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verificar que el body contenga todos los campos requeridos
        const requiredFields = ['card_number', 'cvv', 'expiration_month', 'expiration_year', 'email'];
        const missingFields = requiredFields.filter(field => !(field in req.body));
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: `Faltan campos obligatorios: ${missingFields.join(', ')}` 
            });
        }

        // Crear objeto con los datos de la tarjeta
        const cardData: CardData = {
            card_number: req.body.card_number,
            cvv: req.body.cvv,
            expiration_month: req.body.expiration_month,
            expiration_year: req.body.expiration_year,
            email: req.body.email
        };

        // Validar los datos usando el servicio de validación
        validationService.validateCardData(cardData);
        
        // Si todo está bien, pasar al siguiente middleware
        next();
    } catch (error) {
        // Capturar errores de validación y enviar respuesta adecuada
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Error desconocido' });
        }
    }
};