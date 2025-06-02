import { Router } from 'express';
import { getCardData } from '../controllers/card.controller';

const cardRouter = Router();

cardRouter.get('/:token', getCardData);

export { cardRouter };
