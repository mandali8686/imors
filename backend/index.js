const app = require('./app');
const mongoose = require("mongoose");
const fs = require('fs');
const { initializeFirebase } = require('./utils/firebase');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO;

async function main() {
    await initializeFirebase();
    await mongoose.connect(`mongodb://${MONGO}`, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server listening on port ${PORT}`);
    });

}

main().catch((err) => console.log(err));