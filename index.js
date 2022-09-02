import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/routes.js";
const app = express();
import dotenv from "dotenv";

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

app.use("/", routes);

app.get("/", (req, res) => {
  res.sendFile(
    "D:/workspaces/fcc-ws/backend-development-and-apis/project-exercisetracker" +
      "/views/index.html"
  );
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port" ${PORT}`));
  })
  .catch((error) => console.log(error.message));
