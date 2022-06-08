
import express from 'express';
// import { status } from 'express/lib/response';
import { api } from '../config.js';
import user from './components/user/network.js';

const app = express();

//ROUTERS
app.use('/api/user', user);

//SERVIDOR ACTIVO
app.listen(api.port , () => {
    console.log(`Servidor corriendo en el puerto => ${api.port}`);
}); 