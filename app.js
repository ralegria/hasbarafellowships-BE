import express from "express";
import cors from "cors";
import UsersRoute from "./routes/users.route.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", UsersRoute);

export default app;
