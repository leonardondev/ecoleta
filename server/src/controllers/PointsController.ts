import { Request, Response } from "express";
import { connection } from "../database/connection";
import { serializePoints } from "../serializations/serializePoints";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await connection("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map(serializePoints);

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await connection("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const serializedPoint = serializePoints(point);

    //itens para a interface mobile
    const items = await connection("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;
    const { filename } = request.file as Express.Multer.File;

    const trx = await connection.transaction();

    const point = {
      image: filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    try {
      const insertedIds = await trx("points").insert(point).returning("id");

      const point_id = insertedIds[0].id;

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            //tuplas da tabela pivot
            item_id,
            point_id,
          };
        });
      await trx("point_items").insert(pointItems);

      await trx.commit();
      return response.status(201).json({
        id: point_id,
        ...point, //Spread operator - separa campos de um objeto
      });
    } catch (err) {
      await trx.rollback();
      console.log(err);

      return response.status(400).json({
        error: "Unexpected error while create new product.",
      });
    }
  }
}

export default PointsController;
