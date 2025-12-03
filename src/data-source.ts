import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Address } from "./entity/Address"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "transaction_acid",
    synchronize: false,
    logging: true,
    entities: [User, Address],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
