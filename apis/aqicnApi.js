// Function to get air quality data
import fetch from "node-fetch";
import { AQICN_TOKEN } from "../constants/config.js";

export const getAirQualityByCity = async (city) => {
    try {
        const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${AQICN_TOKEN}`);
        const data = await response.json();
        if (data && data.status && data.status === "ok") {

            return data.data;
        }
        else {
            console.log(data)
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}