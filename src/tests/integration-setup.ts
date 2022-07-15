import request from "supertest";

export const requestAPI = request(process.env.DB_LOCAL_URL);
