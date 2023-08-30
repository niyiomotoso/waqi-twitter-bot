import {getAirQualityByCity, getAirQualityByCityMock} from "../apis/aqicnApi.js";
import {
    arrayContainsNonGoodAQIs,
    getRandomConditionTypeBeta
} from "../helpers/aqiHelper.js";
import {sendTextAndMediaTweet} from "../apis/twitterApi.js";
import cityJson from "../store/cities.json"  assert { type: "json" };
import {
    formatHashTagText,
    getCountryArrayFromJson,
    getRandomNumberFromRange, sizeMessageToTwitterLimit
} from "../helpers/GeneralHelper.js";
import {generateBarChart} from "../canvas/ImageGenerator.js";


export const MultiCitySameCountryMain = async () => {
    let citiesArray = [];
    let aqiArray = [];
    let possibleCitiesToFetch = [];
    let countryName = '';


    // run this until we get a city that has data for us confirm an index was returned
    while (citiesArray.length < 2) {
        const result =  getCitiesFromSingleCountry()
        possibleCitiesToFetch = result.cityArray
        countryName = result.countryName
        for (const possibleCity of possibleCitiesToFetch) {
            await new Promise(resolve => setTimeout(resolve, 20));
            const airQuality = await getAirQualityByCity(possibleCity);
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

    const aqiMessage = `Latest Air Quality Index of cities in ${countryName}.`;

    let caution = ""
    if (arrayContainsNonGoodAQIs(aqiArray)) {
        caution = `Caution: Residents in unhealthy and hazardous areas should avoid outdoor activities.`
    }
    let citiesAndCountry
    citiesAndCountry = citiesArray;
    citiesAndCountry.push(countryName)

    const hashTags = formatHashTagText(citiesAndCountry)
    const fullMessage = aqiMessage  + " \n\n" + caution + "\n\n" + hashTags;
    console.log(fullMessage);
    const response = await sendTextAndMediaTweet(sizeMessageToTwitterLimit(fullMessage), imageBuffer);

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