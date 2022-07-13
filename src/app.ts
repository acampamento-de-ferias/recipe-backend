import "reflect-metadata"
import express from "express";
import 'dotenv/config';
import "./data-source";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(routes);

export { app };