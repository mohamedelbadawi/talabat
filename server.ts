import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./src/auth/Auth.route";
import restaurantRouter from "./src/Restaurant/Restaurant.route";
const app = express();
config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// routes
app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.listen(4000, () => {
  console.log("Talabat listening on port 4000!");
});
