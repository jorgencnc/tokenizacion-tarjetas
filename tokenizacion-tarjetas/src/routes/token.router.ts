import { Router } from 'express';
import { validateTokenRequest } from '../middlewares/validation.middleware';
import { createToken, getTokenData } from '../controllers/token.controller';

const tokenRouter = Router();

tokenRouter.post('/', validateTokenRequest, createToken);
tokenRouter.get('/:token', getTokenData);

export { tokenRouter };
