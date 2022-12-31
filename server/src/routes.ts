import express from "express";
import multer from "multer";

import multerConfig from "./config/multer";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import ValidatePointCreate from "./validators/pointCreate";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//listar os itens de coleta
routes.get("/items", itemsController.index);

//listar todos pontos
routes.get("/points", pointsController.index);

//mostrar um ponto especifico
routes.get("/points/:id", pointsController.show);

//criacao dos pontos de coleta
routes.post(
  "/points",
  upload.single("image"),
  ValidatePointCreate,
  pointsController.create
);

export default routes;
