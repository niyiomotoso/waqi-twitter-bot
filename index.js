import {createCanvas} from 'canvas';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title} from 'chart.js';
import {getTwitterClient} from "./services/twitterApi.js";
import {getAirQualityByCity} from "./services/aqicnApi.js";

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
    const client = getTwitterClient();
    // Upload the chart image to Twitter
    const mediaResponse = await client.v1.uploadMedia(imageBuffer, {
        media_category: 'tweet_image',
        mimeType: 'image/png'
    });

    console.log("mediaId", mediaResponse)
    // Tweet with the chart image
    await client.v2.tweet(tweetText, { media: {media_ids: [mediaResponse] }});

   // console.log('Tweeted:', tweetText);
}

async function main() {
    const cities = ['New York']; // Add more cities as needed

    for (const city of cities) {
        const airQuality = await getAirQualityByCity(city);
        await tweetAirQualityChart(city, airQuality.aqi);
    }
}

main();

