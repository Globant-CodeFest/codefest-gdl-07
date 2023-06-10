import express from "express";
import cors from "cors";
import Routes from './routes/routes.route';   

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",Routes);


export default app;