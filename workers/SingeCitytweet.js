import { getAirQualityByCity } from "../apis/aqicnApi.js";
import {getRandomConditionTypeBeta, getRemarkMapFromAqi} from "../helpers/aqiHelper.js";
import { sendTextOnlyTweet } from "../apis/twitterApi.js";
import cityJson from "../store/cities.json"  assert { type: "json" };
import {
    formatHashTagText,
    getCitiesArrayFromDailyTweetsRecord,
    getCountryArrayFromJson,
    getRandomNumberFromRange, sizeMessageToTwitterLimit
} from "../helpers/GeneralHelper.js";
import {isNumber} from "chart.js/helpers";
import { createDailyTweet, getDailyTweetByTweetType } from "../services/DailyTweetService.js";
import {tweetType} from "../constants/tweetType.js";
import {getTrendsByCountry} from "../apis/twitterTrendsApi.js";
import {EMOJI_STORE} from "../constants/aqiTable.js";

const allowSendBasedOnQuota = (condition) => {
    // pick a condition at random, return true only if it matches the one supplied in the parameter, the idea is to randomise our choice
    return condition === getRandomConditionTypeBeta(condition);
}

export const SingleCityTweetMain = async () => {
    let airQuality = null;
    let cityAndCountry = null;
    let aqIndex = null;
    let condition = null;
    let remark = null;
    // run this until we get a city that has data for us confirm an index was returned
    while ((airQuality == null || !isNumber(aqIndex)) || !allowSendBasedOnQuota(condition)) {
        // delay making requests again for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 20));
        cityAndCountry = await getSingleCityAndCountryToTweet();
        airQuality = await getAirQualityByCity(cityAndCountry.cityName);
        if (airQuality != null) {
            aqIndex = airQuality?.aqi;
            remark = getRemarkMapFromAqi(aqIndex);
            condition = remark.condition
        } else {
             aqIndex = null; condition = null; remark = null;
        }
        console.log("tried ", cityAndCountry, aqIndex, condition)
    }

    const cityUrl = airQuality?.city?.url
    const aqiMessage = `Air Quality Index in ${cityAndCountry.cityName} is ${aqIndex}.`;
    const emoji = EMOJI_STORE[condition]
    const level = `Condition: ${condition} ${emoji}.`
    let caution = "";
    if (remark.caution_short) {
        caution = `Caution: ${remark.caution_short}.`
    }

    let source = "";
    if (cityUrl) {
        source = `${cityUrl}`;
    }
    const hashTags = formatHashTagText([cityAndCountry.cityName, cityAndCountry.countryName])
    const countryTrends = await getTrendsByCountry(cityAndCountry.countryName, 10);
    let fullMessage = aqiMessage + "\n\n" + level + "\n\n" + caution + "\n\n" + source+ "\n\n" + hashTags;
    if (countryTrends !== "") {
        fullMessage += "\n"+countryTrends
    }
    fullMessage = sizeMessageToTwitterLimit(fullMessage)

    console.log(fullMessage);
    const response = await sendTextOnlyTweet(fullMessage);

    if (response === true) {
        console.log("Tweet sent successfully")
        await createDailyTweet({city: cityAndCountry.cityName, country: cityAndCountry.countryName, condition: remark.condition, tweetType: tweetType.SINGLE_CITY_TWEET})
   }
}

const getSingleCityAndCountryToTweet = async () => {
    // get a city and country that we have not sent any tweet to for the day
    const dailyTweetRecord = await getDailyTweetByTweetType(tweetType.SINGLE_CITY_TWEET)
    const cityArray = getCitiesArrayFromDailyTweetsRecord(dailyTweetRecord)
    const countryArray = getCountryArrayFromJson()
    let cityName = "";
    let countryName = "";

    while (cityName === "") {
        const countryIndexToUse = getRandomNumberFromRange(0, countryArray.length - 1)
        countryName = countryArray[countryIndexToUse];
        const citiesInCountry = cityJson[countryName];
        const cityIndexToUse = getRandomNumberFromRange(0, citiesInCountry.length - 1)
        const cityAtIndex = citiesInCountry[cityIndexToUse]
        if (!cityArray.includes(cityAtIndex))
        {
            cityName = cityAtIndex;
        }
    }

    return {cityName, countryName}
}