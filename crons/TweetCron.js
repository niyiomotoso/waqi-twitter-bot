import cron from "node-cron"
import { SingleCityTweetMain } from "../workers/SingeCitytweet.js";
import { deleteAllTweets } from "../services/DailyTweetService.js";
import {MultiCitySameCountryMain} from "../workers/MultiCitySameCountryTweet.js";
import {MultiCityMultiCountryMain} from "../workers/MultiCityMultiCountry.js";

const runSingleCityTweet = cron.schedule('*/15 * * * *', async () => {
    console.log("running runSingleCityTweet cron")
    await SingleCityTweetMain();
});

const runMultiCitySameCountryTweet = cron.schedule('0 */1 * * *', async () => {
    console.log("running runMultiCitySameCountryTweet cron")
    await MultiCitySameCountryMain();
});

const runMultiCityMultiCountryTweet = cron.schedule('0 */2 * * *', async () => {
    console.log("running runMultiCityMultiCountryTweet cron")
    await MultiCityMultiCountryMain();
});


const runDeleteDailyTweet = cron.schedule('0 0 * * *', async () => {
    console.log("running runDeleteDailyTweet cron")
    await deleteAllTweets();
});

export const startTweetCron = () => {
    runSingleCityTweet.start();
    runMultiCitySameCountryTweet.start();
    runMultiCityMultiCountryTweet.start();
    runDeleteDailyTweet.start();
}