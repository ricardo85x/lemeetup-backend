import express from "express";

import "express-async-errors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => console.log("Listening on port 3333"));
