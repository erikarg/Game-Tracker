import express from "express";
import usersRoute from "./routes/users.route";
import loginRoute from "./routes/login.route";

const app = express();

app.use(express.json());
app.use("/users", usersRoute);
app.use("/login", loginRoute);

export default app;
