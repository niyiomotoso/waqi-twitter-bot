import {getAirQualityByCity, getAirQualityByCityMock} from "../apis/aqicnApi.js";
import {
    arrayContainsNonGoodAQIs,
    getRandomConditionType,
    getRandomConditionTypeBeta,
    getRemarkMapFromAqi
} from "../helpers/aqiHelper.js";
import {sendTextAndMediaTweet, sendTextOnlyTweet} from "../apis/twitterApi.js";
import cityJson from "../store/cities.json"  assert { type: "json" };
import {
    formatHashTagText,
    getCitiesArrayFromDailyTweetsRecord,
    getCountryArrayFromJson,
    getRandomNumberFromRange
} from "../helpers/GeneralHelper.js";
import {isNumber} from "chart.js/helpers";
import { createDailyTweet, getDailyTweetByTweetType } from "../services/DailyTweetService.js";
import {tweetType} from "../constants/tweetType.js";
import {generateBarChart} from "../canvas/ImageGenerator.js";

const allowSendBasedOnQuota = (condition) => {
    // pick a condition at random, return true only if it matches the one supplied in the parameter, the idea is to randomise our choice
    return condition === getRandomConditionTypeBeta(condition);
}

export const MultiCitySameCountryMain = async () => {
    let citiesArray = [];
    let aqiArray = [];
    let possibleCitiesToFetch = [];
    let countryName = '';


    // run this until we get a city that has data for us confirm an index was returned
    while (citiesArray < 2) {
        const result =  getCitiesFromSingleCountry()
        possibleCitiesToFetch = result.cityArray
        countryName = result.countryName
        for (const possibleCity of possibleCitiesToFetch) {
            await new Promise(resolve => setTimeout(resolve, 20));
            const airQuality = await getAirQualityByCityMock(possibleCity);
            let aqIndex = null;
            if (airQuality != null) {
                aqIndex = airQuality?.aqi
                citiesArray.push(possibleCity)
                aqiArray.push(aqIndex)
            } else {
                aqIndex = null;
            }

            console.log("tried ", countryName, possibleCity, aqIndex)
        }

    }

    const chartTitle = `Air Quality Index of cities in ${countryName}`;
    const imageBuffer = await generateBarChart(citiesArray, aqiArray, chartTitle)

    const aqiMessage = `Here is the latest Air Quality Index of cities in ${countryName}.`;

    let caution = ""
    if (arrayContainsNonGoodAQIs(aqiArray)) {
        caution = `Caution: Residents in unhealthy and hazardous area should avoid outdoor activities.`
    }
    let citiesAndCountry
    citiesAndCountry = citiesArray;
    citiesAndCountry.push(countryName)

    const hashTags = formatHashTagText(citiesAndCountry)
    const fullMessage = aqiMessage  + " \n\n" + caution + "\n\n" + hashTags;
    console.log(fullMessage);
    const response = await sendTextAndMediaTweet(fullMessage, [imageBuffer]);

    if (response === true) {
        console.log("Tweet sent successfully")
    }
}

const getCitiesFromSingleCountry =  () => {
    // get cities from a country with multiple cities
    let cityArray = [];
    let countryName = "";
    while (cityArray.length < 2) {
        const countryArray = getCountryArrayFromJson();
        const countryIndexToUse = getRandomNumberFromRange(0, countryArray.length - 1)
        countryName = countryArray[countryIndexToUse];

        cityArray = cityJson[countryName]
    }

    return {cityArray, countryName};
}