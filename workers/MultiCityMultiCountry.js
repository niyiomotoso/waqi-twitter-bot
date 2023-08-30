import {getAirQualityByCity, getAirQualityByCityMock} from "../apis/aqicnApi.js";
import {
    arrayContainsAtLeastOneUnhealthyIndex,
    arrayContainsNonGoodAQIs, getRandomConditionTypeBeta
} from "../helpers/aqiHelper.js";
import {sendTextAndMediaTweet} from "../apis/twitterApi.js";
import cityJson from "../store/cities.json"  assert { type: "json" };
import {
    formatHashTagText,
    getCountryArrayFromJson,
    getRandomNumberFromRange, sizeMessageToTwitterLimit
} from "../helpers/GeneralHelper.js";
import {generateBarChart} from "../canvas/ImageGenerator.js";


export const MultiCityMultiCountryMain = async () => {
    let citiesArray = [];
    let aqiArray = [];
    let possibleCitiesToFetch = [];
    let excludeList = [];

    const allowSendBasedOnQuota = (aqiArray) => {
        return arrayContainsAtLeastOneUnhealthyIndex(aqiArray);
    }

    // run this until we get at least 6 cities in our final array
    while (citiesArray.length < 7) {
        // get cities in batches of 4
        possibleCitiesToFetch =  getCitiesFromDifferentCountries(excludeList, 4)
        excludeList = [...excludeList, ...possibleCitiesToFetch];
        for (const possibleCity of possibleCitiesToFetch) {
            await new Promise(resolve => setTimeout(resolve, 20));
            const airQuality = await getAirQualityByCity(possibleCity.cityName);
            let aqIndex = null;
            if (airQuality != null) {
                aqIndex = airQuality?.aqi
                citiesArray.push(`${possibleCity.cityName}, ${possibleCity.countryName}`)
                aqiArray.push(aqIndex)
            } else {
                aqIndex = null;
            }

            console.log("tried ", possibleCity.countryName, possibleCity.cityName, aqIndex)
        }

    }

    const chartTitle = `Air Quality Index of cities around the world`;
    const imageBuffer = await generateBarChart(citiesArray, aqiArray, chartTitle)

    const aqiMessage = `Latest Air Quality Index of cities in different cities around the world.`;

    let caution = ""
    if (arrayContainsNonGoodAQIs(aqiArray)) {
        caution = `Caution: Residents in unhealthy and hazardous areas should avoid outdoor activities.`
    }

    const hashTags = formatHashTagText([])
    const fullMessage = aqiMessage  + " \n\n" + caution + "\n\n" + hashTags;
    console.log(fullMessage);
    const response = await sendTextAndMediaTweet(sizeMessageToTwitterLimit(fullMessage), imageBuffer);

    if (response === true) {
        console.log("Tweet sent successfully")
    }
}

const getCitiesFromDifferentCountries =  (excludeList, batch) => {
    // get cities from a country with multiple cities
    let cityArray = [];
    while (cityArray.length < batch) {
        let countryName = ""
        const countryArray = getCountryArrayFromJson();
        const countryIndexToUse = getRandomNumberFromRange(0, countryArray.length - 1)
        countryName = countryArray[countryIndexToUse];
        const citiesInCountry = cityJson[countryName];
        const cityIndexToUse = getRandomNumberFromRange(0, citiesInCountry.length - 1)
        const cityAtIndex = citiesInCountry[cityIndexToUse]
        const cityAndCountry = {cityName: cityAtIndex, countryName: countryName}
        if (!cityArray.includes(cityAndCountry) && !excludeList.includes(cityAndCountry)) {
            cityArray.push(cityAndCountry)
        }
    }

    return cityArray;
}
