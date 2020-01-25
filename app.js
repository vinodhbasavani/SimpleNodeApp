import express from 'express';
import morgan from 'morgan';

import healthRoute from './routes/health';
import authRoutes from './routes/auth';

const app = express();

app.use('/health', healthRoute);

app.use(morgan('dev'));

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`api server started on port ${process.env.PORT}`);
});
