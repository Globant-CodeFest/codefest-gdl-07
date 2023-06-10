import "reflect-metadata";
import { DataSource } from "typeorm";
import { Vectors } from "../entity/vectors.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "iteli18",
    database: "chatwithpdfsdb",
    synchronize: true,
    logging: false,
    entities: [Vectors],
    migrations: [],
    subscribers: [],
})
