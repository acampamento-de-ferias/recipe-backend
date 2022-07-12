import { DataSource } from "typeorm";
import { Ingredient } from "./entities/Ingredient";
import { Instruction } from "./entities/Instruction";
import { Recipe } from "./entities/Recipe";

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_CONTAINER_HOST,
    port: parseInt(process.env.DB_CONTAINER_PORT),
    username: process.env.DB_CONTAINER_USER,
    password: process.env.DB_CONTAINER_ROOT_PASSWORD,
    database: process.env.DB_CONTAINER_NAME,
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/database/migrations/*.ts'],
    entities: [Recipe, Ingredient, Instruction],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export default AppDataSource;