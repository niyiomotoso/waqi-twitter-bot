import { messageHandler }  from "../utils/index.js";
import   {DailyTweets}  from "../schema/DailyTweetSchema.js";

export const createDailyTweet = async (data) => {
    const dailyTweets = new DailyTweets(data);
    return await dailyTweets.save(async (error, res) => {
        if (error) {
            return messageHandler("error", false, error)
        } else {
            return messageHandler("success", true, res)
        }
    })
}

export const getDailyTweetByTweetType = async (tweetType) => {
    return await DailyTweets.find({tweetType: tweetType}).exec();
}

export const deleteAllTweets = async () => {
    return DailyTweets.deleteMany({});
}
