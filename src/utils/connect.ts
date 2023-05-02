import mongoose from "mongoose";
import logger from "./logger";
const config = require("config");

async function connect() {
  mongoose.set("strictQuery", true);
  const dbUri = process.env.DB_URL || config.get("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;