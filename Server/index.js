import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import  kpis  from "./data/data.js";
import KPI from "./models/KPI.js";
/*Configurations*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Routes*/

app.use("/kpi", kpiRoutes);

/*MONGOOSE SETUP*/

const MONGO_URL =
  "mongodb+srv://alaaobed88:1234@cluster0.eoxwa5x.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 9000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //await mongoose.connection.db.dropDatabase();
    //KPI.insertMany(kpis);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application with a non-zero error code
  });
