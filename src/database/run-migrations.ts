import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'recipes',
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/migrations/**/*.{js, ts}`]
});
