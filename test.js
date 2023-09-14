import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/.env' })
import {SingleCityTweetMain} from "./workers/SingeCitytweet.js";
import {GenerateChartForCities} from "./examples/GenerateChartForCities.js";

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log("Database Connected");
    main();
});

async function main() {
    GenerateChartForCities()
}