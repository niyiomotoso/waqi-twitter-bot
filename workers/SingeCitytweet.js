import { getAirQualityByCity } from "../services/aqicnApi.js";
import {getRemarkMapFromAqi} from "../helpers/aqiHelper.js";
import {sendTextOnlyTweet} from "../services/twitterApi.js";
import cityJson from "../store/cities.json"  assert { type: "json" };
import {getCountryArrayFromJson, getRandomNumberFromRange} from "../helpers/GeneralHelper.js";
import {isNumber} from "chart.js/helpers";

export const SingleCityTweetMain = async () => {
    let airQuality = null;
    let cityAndCountry = null;
    let aqIndex = null;
    // run this until we get a city that has data for us confirm an index was returned
    while (airQuality == null || !isNumber(aqIndex)) {
        cityAndCountry = getSingleCityAndCountryToTweet();
        airQuality = await getAirQualityByCity(cityAndCountry.cityName);
        aqIndex = airQuality?.aqi;
    }

    const cityUrl = airQuality?.city?.url
    const aqiMessage = `Air quality index in ${cityAndCountry.cityName}, ${cityAndCountry.countryName} currently is ${aqIndex}.`;
    const remark = getRemarkMapFromAqi(aqIndex);
    const level = `Condition: ${remark.condition}.`
    let caution = "";
    if (remark.caution) {
        caution = `Caution: ${remark.caution}.`
    }

    let source = "";
    if (cityUrl) {
        source = `Source: ${cityUrl}`;
    }

    const fullMessage = aqiMessage + " \n\n" + level + " \n\n" + caution + "\n\n" + source;
    await sendTextOnlyTweet(fullMessage);
}

const getSingleCityAndCountryToTweet = () => {
    const countryArray = getCountryArrayFromJson()
    const countryIndexToUse = getRandomNumberFromRange(0, countryArray.length -1)
    const countryName = countryArray[countryIndexToUse];
    const citiesInCountry = cityJson[countryName];
    const cityIndexToUse = getRandomNumberFromRange(0, citiesInCountry.length - 1)

    const cityName = citiesInCountry[cityIndexToUse]
    console.log(cityName, countryName)
    return {cityName, countryName}
}

getSingleCityAndCountryToTweet()