import { Request, Response } from "express";
import { connection } from "../database/connection";
import { serializeItems } from "../serializations/serializeItems";

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await connection("items").select("*");

    const serializedItems = items.map(serializeItems);

    return response.json(serializedItems);
  }
}

export default ItemsController;
