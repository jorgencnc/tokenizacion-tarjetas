import express from 'express';
import bodyParser from 'body-parser';
import { tokenRouter } from './routes/token.router';
import { cardRouter } from './routes/card.router';
import { authMiddleware } from './middlewares/auth.middleware';
import { initializeDatabase } from './config/db.init';

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.use(bodyParser.json());
app.use(authMiddleware);
app.use('/tokens', tokenRouter);
app.use('/cards', cardRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
