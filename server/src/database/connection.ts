import knex, { Knex } from "knex";
import path from "path";
import "dotenv/config";

interface KnexConfig {
  [key: string]: Knex.Config;
}

const environment = process.env.NODE_ENV ?? "development";

const knexConfig: KnexConfig = {
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
    },
    useNullAsDefault: true,
  },

  development: {
    debug: true,
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "database.sqlite"),
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "test.sqlite"),
    },
    useNullAsDefault: true,
  },
};

export const connection = knex(knexConfig[environment]);
