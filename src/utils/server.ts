import express from "express";
import cors from "cors";
import router from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  let corsOptions = {
    origin: 'http://localhost:3000/'
  }
  app.use(cors(corsOptions));
  app.use("/", router);

  return app;
};

export default createServer;