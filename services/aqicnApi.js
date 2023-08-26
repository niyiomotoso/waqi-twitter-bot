// Function to get air quality data
import fetch from "node-fetch";
import {AQICN_TOKEN} from "../constants/config.js";

export const getAirQualityByCity = async (city) => {
    const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${AQICN_TOKEN}`);
    const data = await response.json();
    return data.data;
}