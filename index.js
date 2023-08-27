import {createCanvas} from 'canvas';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title} from 'chart.js';
import {sendTextAndMediaTweet, uploadMedia} from "./services/twitterApi.js";
import {getAirQualityByCity} from "./services/aqicnApi.js";
import dotenv from 'dotenv'
import http from 'http';
dotenv.config()
import {startTweetCron} from "./crons/TweetCron.js";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController);

// Create a chart and return a base64 image
async function createChartImage(city, airQuality) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [city],
            datasets: [{
                label: 'Air Quality Index',
                data: [airQuality],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
    });

    // Render the chart to the canvas
    await chart.render();
    // Convert the canvas to a buffer
    return canvas.toBuffer('image/png');
}

// Function to tweet the air quality chart
async function tweetAirQualityChart(city, airQuality) {
    const imageBuffer = await createChartImage(city, airQuality);

    const tweetText = `Air quality index for ${city}: ${airQuality}`;
    // Upload the chart image to Twitter
    const mediaId = await uploadMedia(imageBuffer);
    // Tweet with the chart image
    await sendTextAndMediaTweet(tweetText, [mediaId]);
    console.log("mediaId", mediaId)
}

async function main() {
    const cities = ['London']; // Add more cities as needed
    for (const city of cities) {
        const airQuality = await getAirQualityByCity(city);
        await tweetAirQualityChart(city, airQuality.aqi);
    }
}


http.createServer(function (request, response) {
    startTweetCron();
}).listen(process.env.PORT || 5000);
