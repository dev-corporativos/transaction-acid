import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Address } from "./entity/Address"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5000,
    username: "admin",
    password: "admin",
    database: "transaction_acid",
    synchronize: true,
    logging: false,
    entities: [User, Address],
    migrations: [],
    subscribers: [],
})
