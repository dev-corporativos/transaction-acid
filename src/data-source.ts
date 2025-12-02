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
    synchronize: false,
    logging: true,
    entities: [User, Address],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
