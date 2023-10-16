import cron from "node-cron"
import { SingleCityTweetMain } from "../workers/SingeCitytweet.js";
import { deleteAllTweets } from "../services/DailyTweetService.js";
import {MultiCitySameCountryMain} from "../workers/MultiCitySameCountryTweet.js";
import {MultiCityMultiCountryMain} from "../workers/MultiCityMultiCountry.js";

const runSingleCityTweet = cron.schedule('0 */1 * * *', async () => {
    console.log("running runSingleCityTweet cron")
    await SingleCityTweetMain();
}); // 24 tweets


const runSingleCityTweet2 = cron.schedule('0 */12 * * *', async () => {
    console.log("running runSingleCityTweet cron")
    await SingleCityTweetMain();
}); // 2 tweets


const runMultiCitySameCountryTweet = cron.schedule('3 */2 * * *', async () => {
    console.log("running runMultiCitySameCountryTweet cron")
    await MultiCitySameCountryMain();
}); // 12 tweets

const runMultiCityMultiCountryTweet = cron.schedule('11 */5 * * *', async () => {
    console.log("running runMultiCityMultiCountryTweet cron")
    await MultiCityMultiCountryMain();
}); // 5 tweets


const runDeleteDailyTweet = cron.schedule('0 0 * * *', async () => {
    console.log("running runDeleteDailyTweet cron")
    await deleteAllTweets();
});

export const startTweetCron = () => {
    runSingleCityTweet.start();
    runSingleCityTweet2.start();
    runMultiCitySameCountryTweet.start();
    runMultiCityMultiCountryTweet.start();
    runDeleteDailyTweet.start();
}