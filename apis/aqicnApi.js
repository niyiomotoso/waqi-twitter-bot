import {getRandomNumberFromRange} from "../helpers/GeneralHelper.js";
import axios from "axios";
import API from "waqi-js-client";


export const getAirQualityByCity = async (city) => {
    const apiKey = process.env.AQICN_TOKEN;
    const waqiAPI = new API(apiKey);

    const cityFeedEntity = waqiAPI.cityFeed();
    cityFeedEntity.setCity(city);
    return await cityFeedEntity.fetchItems().then(response => {
        const data = response
        console.log(data);
        if (data && data.status && data.status === "ok" && !isNaN(data.data?.aqi)) {
            return data.data;
        }
        return null;

    }).catch(error => {
        console.log("error", error)
        return null;
    });
}

export const axiosGetAirQualityByCity = async (city) => {
    const options = {
        method: 'GET',
        url: `https://api.waqi.info/feed/${city}/?token=${process.env.AQICN_TOKEN}`,
        headers: {
            'content-type': 'application/json',
        },
    };

    return  axios.request(options).then(response => {
        const data = response?.data
        if (data && data.status && data.status === "ok" && !isNaN(data.data?.aqi)) {
            return data.data;
        }
        return null;
    }).catch(error => {
        console.log("error", error)
        return null;
    });
}

export const getAirQualityByCityMock = async (city) => {
    return {
        'aqi': getRandomNumberFromRange(0, 300),
    }
}