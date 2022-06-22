import { DataSource } from "typeorm";
import { Ingredient } from "./entity/Ingredient";
import { Instruction } from "./entity/Instruction";
import { Recipe } from "./entity/Recipe";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "database-node",
    port: 3306,
    username: "root",
    password: "admin",
    database: "recipes",
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/migration/**/*.ts'],
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