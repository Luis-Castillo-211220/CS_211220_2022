
import express from 'express';

import { api } from './config/config.js';
import user from './router/user.js';

const app = express();

// ROUTERS
app.use('/api/user', user);

// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
});