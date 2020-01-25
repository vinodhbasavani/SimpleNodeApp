import express from 'express';

import healthController from '../controllers/health';

const routes = express();

routes.get('', healthController.index);

export default routes;
