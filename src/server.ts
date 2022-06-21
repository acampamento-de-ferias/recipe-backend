import "reflect-metadata"
import express from "express";
import "./data-source";

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(4000, () => console.log("Server is Running"))