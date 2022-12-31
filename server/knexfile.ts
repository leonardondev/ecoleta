import path from "path";
import "dotenv/config";

const environment = process.env.NODE_ENV ?? "development";

interface KnexConfig {
  [key: string]: object;
}

const knexConfig: KnexConfig = {
  production: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
    useNullAsDefault: true,
  },

  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "test.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
    useNullAsDefault: true,
  },
};

export default knexConfig[environment];
