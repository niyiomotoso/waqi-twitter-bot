import axios from 'axios'
import countriesWoeIdJson from "../store/countriesWoeId.json"  assert { type: "json" };
import {formatToStringText, getRandomElementsFromArray} from "../helpers/GeneralHelper.js";

export const getTrendsByCountry = async (country, limit) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('woeid', countriesWoeIdJson[country]);

    const options = {
        method: 'POST',
        url: 'https://twitter-trends5.p.rapidapi.com/twitter/request.php',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': 'twitter-trends5.p.rapidapi.com'
        },
        data: encodedParams,
    };

    let trends = "";
    try {
        const response = await axios.request(options);
        const payload = response?.data?.trends;
        const trendsArray = getTrendsArrayFromPayloadObject(payload);
        trends = formatToStringText(getRandomElementsFromArray(trendsArray, limit));
    } catch (error) {
        console.error(error);
    }
    return trends;
}

const getTrendsArrayFromPayloadObject = (payload) => {
    let trends = [];
    for (const id in payload) {
        if (payload[id]?.name) {
            trends.push(payload[id].name)
        }
    }

    return trends;
}
