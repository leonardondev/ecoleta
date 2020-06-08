import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const upload = multer(multerConfig);


const pointsController = new PointsController();
const itemsController = new ItemsController();

//listar os itens de coleta
routes.get('/items', itemsController.index);

//listar todos pontos
routes.get('/points', pointsController.index);

//mostrar um ponto especifico
routes.get('/points/:id', pointsController.show);


//criacao dos pontos de coleta
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  } 
  ),
  pointsController.create);


export default routes;
