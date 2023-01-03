import { join } from "path";
import "dotenv/config";

const BASE_PATH = join(__dirname, "src", "database");

export default {
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: join(BASE_PATH, "seeds"),
    },
    useNullAsDefault: true,
  },

  development: {
    debug: true,
    client: "sqlite3",
    connection: {
      filename: join(BASE_PATH, "database.sqlite"),
    },
    migrations: {
      directory: join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: join(BASE_PATH, "seeds"),
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: join(BASE_PATH, "test.sqlite"),
    },
    migrations: {
      directory: join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: join(BASE_PATH, "seeds"),
    },
    useNullAsDefault: true,
  },
};
