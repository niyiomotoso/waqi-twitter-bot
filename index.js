import {TwitterApi} from 'twitter-api-v2';
import fetch from 'node-fetch';
import {createCanvas} from 'canvas';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title} from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController);


// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi({appKey: 'DipLrCP945optHSHiMbC1tbEv',
    appSecret: 'tSlTN2m62wqjIi4tA4JZOS8ErKXGBUMZwAzYxOpBRXRWg1c1AX',
    accessToken: '1695095041293783040-wD3RHThGOewTURf75DreOWw4e1b2iu',
    accessSecret: '8Cm9KWXwURlQt0gLp1Ejws40fvSqGxwltBLi3qkLjmZtR'});

// Tell typescript it's a readonly app
const client = twitterClient.readOnly;

// Function to get air quality data
async function getAirQuality(city) {
    const response = await fetch(`https://api.waqi.info/feed/${city}/?token=f4523891710538bf622648db0952c2e7e660e770`);
    const data = await response.json();
    return data.data.aqi;
}

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
        const airQuality = await getAirQuality(city);
        await tweetAirQualityChart(city, airQuality);
    }
}

main();

