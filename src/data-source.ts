import { DataSource } from "typeorm";
import { Ingredient } from "./entities/Ingredient";
import { Instruction } from "./entities/Instruction";
import { Recipe } from "./entities/Recipe";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "database-node",
    port: 3306,
    username: "root",
    password: "admin",
    database: "recipes",
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