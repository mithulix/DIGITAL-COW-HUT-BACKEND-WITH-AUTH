import mongoose from "mongoose";
import app from "./app";
import config from "./config/envConfig";
const port = config.PORT;

// Connect Database
mongoose
  .connect(config.DATABASE_URL as string)
  .then(() => console.log("😂 Database connected successfully"))
  .catch((error) => console.log(`Unable to connect MongoDB: ${error}`));

// Listen to Server
const server = app.listen(port, () => {
  console.log(`🐳 Server is running on port ${port}`);
});


// Unhandled Rejection: Gracefully off the server
process.on("unhandledRejection", (error) => {
  console.log(`Unhandled rejection : ${error}`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

