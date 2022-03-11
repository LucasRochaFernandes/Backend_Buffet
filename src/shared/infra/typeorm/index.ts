import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "buffet_database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost": host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_supertest"
          : defaultOptions.database,
    })
  );
};
