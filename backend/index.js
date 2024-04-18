const app = require("./app");
const mongoose = require("mongoose");
const fs = require("fs");
const { bucket } = require("./firebase-config");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO;

async function main() {
  // Connect to MongoDB
  await mongoose.connect(`mongodb://${MONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start the server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main().catch((err) => console.log(err));
