import cron from "node-cron"
import { SingleCityTweetMain } from "../workers/SingeCitytweet.js";
import { deleteAllTweets } from "../services/DailyTweetService.js";

const runSingleCityTweet = cron.schedule('*/15 * * * *', async () => {
    console.log("running runSingleCityTweet cron")
    await SingleCityTweetMain();
});


const runDeleteDailyTweet = cron.schedule('0 0 * * *', async () => {
    console.log("running runDeleteDailyTweet cron")
    await deleteAllTweets();
});

export const startTweetCron = () => {
    runSingleCityTweet.start();
    runDeleteDailyTweet.start();
}