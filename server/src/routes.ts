import express from 'express';

import PointsController from './controllers/PonitsCOntroller';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//listar os itens de coleta
routes.get('/items', itemsController.index);

//criacao dos pontos de coleta
routes.post('/points', pointsController.create);

//listar todos pontos
routes.get('/points', pointsController.index);

//mostrar um ponto especifico
routes.get('/points/:id', pointsController.show);

export default routes;
