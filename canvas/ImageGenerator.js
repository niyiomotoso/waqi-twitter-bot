import fs from 'fs';
import {createCanvas} from 'canvas';
import {BarController, BarElement, CategoryScale, Chart, Colors, Legend, LinearScale, Title} from 'chart.js';
import {getRandomNumberFromRange} from "../helpers/GeneralHelper.js";
import {Themes} from "../themes/Colors.js";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController, Colors, Legend);

// Function to generate a bar chart image
export const  generateBarChart = async (cities, aqi, chartTitle) => {
    const colorTheme = Themes[getRandomNumberFromRange(0,2)];
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = colorTheme.mainBackground;
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

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
                borderColor: 'transparent',
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    font: {
                        size: 14,
                    },
                },
            }],
        },
        options: {
            // Set the background color of the chart to purple
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    color: colorTheme.fontColor, // Set title color
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    position: 'right',
                    display: true,
                    labels: {
                        color: colorTheme.fontColor,
                        usePointStyle: true,
                        font: {
                            size: 16,
                        },
                        generateLabels: (chart) => {
                            return [
                                {text: 'Good', fillStyle: 'green', 'fontColor': colorTheme.fontColor},
                                {text: 'Moderate', fillStyle: 'yellow', 'fontColor': colorTheme.fontColor},
                                {text: 'Unhealthy', fillStyle: 'orange', 'fontColor': colorTheme.fontColor},
                                {text: 'Hazardous', fillStyle: 'red', 'fontColor': colorTheme.fontColor},
                            ];
                        },
                    },
                },
                datalabels: {
                    color: colorTheme.fontColor, // Set AQI value color
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: colorTheme.fontColor, // Set x-axis tick color
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colorTheme.fontColor, // Set y-axis tick color
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        },
        plugins: [plugin]
    });

    // chart.options.plugins.legend.display = true;
    await chart.render();

    const imageBuffer = canvas.toBuffer('image/png');

    // Save the chart as a PNG image on the server
    fs.writeFileSync('barChart.png', imageBuffer);

    return imageBuffer;
}
