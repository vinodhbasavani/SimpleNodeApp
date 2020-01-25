import express from 'express';

import loginController from '../controllers/auth/login.js';
import registerController from '../controllers/auth/register.js';

const routes = express();

routes.get('/login', loginController.index);
routes.post('/register', registerController.index);

export default routes;
