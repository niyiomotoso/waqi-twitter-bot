import {TwitterApi} from 'twitter-api-v2';
import fetch from 'node-fetch';
import fs from 'fs';
import { createCanvas, loadImage }  from 'canvas';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, Title, Colors} from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController, Colors);

// Configure Twitter API credentials

// Function to generate a bar chart image
// Function to generate a bar chart image
async function generateBarChart(cities, aqi) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cities,
            datasets: [{
                label: 'Air Quality Index',
                data: aqi,
                backgroundColor: aqi.map(value => {
                    if (value <= 50) return 'green';
                    if (value <= 100) return 'yellow';
                    if (value <= 200) return 'orange';
                    return 'red';
                }),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Air Quality Index of cities in Germany',
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        font: {
                            size: 16,
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 14,
                        },
                    },
                },
            },
            // Set the background color of the chart to purple
            plugins: {
                title: {
                    display: true,
                    text: 'Air Quality Index of cities in Germany',
                    color: 'white', // Set title color
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        font: {
                            size: 16,
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white', // Set x-axis tick color
                        font: {
                            size: 14,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Set y-axis tick color
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        },
    });

    // Render the chart without legend and title
    chart.options.plugins.legend.display = false;
    chart.options.plugins.title.display = false;

    await chart.render();

    const imageBuffer = canvas.toBuffer('image/png');

    // Save the chart as a PNG image on the server
    fs.writeFileSync('barChart.png', imageBuffer);

    return imageBuffer;
}



// Function to tweet the bar chart
async function tweetBarChart(imageBuffer) {
    const client = new TwitterApi({
        appKey: 'YOUR_APP_KEY',
        appSecret: 'YOUR_APP_SECRET',
        accessToken: 'YOUR_ACCESS_TOKEN',
        accessSecret: 'YOUR_ACCESS_SECRET',
    });
    // Upload the chart image to Twitter
    const mediaResponse = await client.v1.uploadMedia(imageBuffer, {
        media_category: 'tweet_image',
        mimeType: 'image/png',
    });

    const mediaId = mediaResponse.media_id_string;

    // Tweet with the chart image
    await client.v1.tweet('Check out the Air Quality Index chart for cities in Germany!', {
        media_ids: [mediaId],
    });

    console.log('Tweeted the bar chart');
}

async function main() {
    const cities = ['Hamburg', 'Berlin', 'Munich', 'Kiel', 'Stuttgart'];
    const aqi = [23, 40, 45, 201, 100];

    const barChartImage = await generateBarChart(cities, aqi);
    // await tweetBarChart(barChartImage);
}

main();
