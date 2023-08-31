import {MultiCitySameCountryMain} from "./workers/MultiCitySameCountryTweet.js";
import {MultiCityMultiCountryMain} from "./workers/MultiCityMultiCountry.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/.env' })


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log("Database Connected");
});

async function main() {
    // MultiCityMultiCountryMain()
    MultiCitySameCountryMain()
}

main();
