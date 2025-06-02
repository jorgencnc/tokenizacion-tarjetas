import { Request, Response } from 'express';
import { cardService } from '../services/card.service';

export const getCardData = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (typeof token !== 'string' || token.length !== 16) {
      return res.status(400).json({ error: 'El token debe tener exactamente 16 caracteres' });
    }

    let cardData = await cardService.getCardData(token);

    if (!cardData) {
      return res.status(404).json({ error: 'Token no encontrado o ha expirado' });
    }

    if (typeof cardData === 'string') {
      try {
        cardData = JSON.parse(cardData);
      } catch (e) {
        console.error('Error parsing cardData JSON:', e);
      }
    }

    const { cvv, ...safeCardData } = cardData as { [key: string]: any };

    return res.json(safeCardData);
  } catch (error) {
    console.error('Error en card.controller:', error);
    return res.status(500).json({ error: 'Error al obtener los datos de la tarjeta' });
  }
};
