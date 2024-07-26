import express from 'express';
import coockieParser from "cookie-parser";
import cors from 'cors';
import router from './routers/user.router.js';
const app =  express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(coockieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));

app.use("/api/v1", router);

export default app;