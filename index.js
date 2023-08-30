import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title} from 'chart.js';
import dotenv from 'dotenv'
import http from 'http';
dotenv.config()
import {startTweetCron} from "./crons/TweetCron.js";
import mongoose from 'mongoose';
import { MONGO_URL } from "./constants/config.js";
import {SingleCityTweetMain} from "./workers/SingeCitytweet.js";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController);

mongoose.connect(MONGO_URL, {
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
