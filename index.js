import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title} from 'chart.js';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { startTweetCron } from "./crons/TweetCron.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/.env' })

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log("Database Connected");
});

http.createServer(function (request, response) {

}).listen(process.env.PORT || 5000);
