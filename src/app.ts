import 'dotenv/config';
import express from "express";
import "reflect-metadata";
import "./data-source";
import routes from "./routes";

const app = express();

app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use('/storage', express.static(__dirname + '/storage/uploads')); // keep files public

app.use(routes);

export { app };
