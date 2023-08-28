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

// Create a chart and return a base64 image
// async function createChartImage(city, airQuality) {
//     const canvas = createCanvas(800, 600);
//     const ctx = canvas.getContext('2d');
//
//     const chart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: [city],
//             datasets: [{
//                 label: 'Air Quality Index',
//                 data: [airQuality],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             }],
//         },
//     });
//
//     // Render the chart to the canvas
//     await chart.render();
//     // Convert the canvas to a buffer
//     return canvas.toBuffer('image/png');
// }
//
// // Function to tweet the air quality chart
// async function tweetAirQualityChart(city, airQuality) {
//     const imageBuffer = await createChartImage(city, airQuality);
//
//     const tweetText = `Air quality index for ${city}: ${airQuality}`;
//     // Upload the chart image to Twitter
//     const mediaId = await uploadMedia(imageBuffer);
//     // Tweet with the chart image
//     await sendTextAndMediaTweet(tweetText, [mediaId]);
//     console.log("mediaId", mediaId)
// }
//
// async function main() {
//     const cities = ['London']; // Add more cities as needed
//     for (const city of cities) {
//         const airQuality = await getAirQualityByCity(city);
//         await tweetAirQualityChart(city, airQuality.aqi);
//     }
// }

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
