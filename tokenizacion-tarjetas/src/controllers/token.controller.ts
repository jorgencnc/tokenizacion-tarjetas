import { Request, Response } from 'express';
import { tokenRepository } from '../repositories/token.repository';
import { validateTokenRequest } from '../middlewares/validation.middleware';
import crypto from 'crypto';

export const createToken = async (req: Request, res: Response) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    await tokenRepository.save(token, req.body);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar token' });
  }
};


export const getTokenData = async (req: Request, res: Response) => {
  try {
    let data = await tokenRepository.get(req.params.token);
    if (!data) return res.status(404).json({ error: 'Token inválido o expirado' });

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing cardData JSON:', e);
      }
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del token' });
  }
};
