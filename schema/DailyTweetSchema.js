import mongoose from "mongoose";
const Schema = mongoose.Schema;

let DailyTweetSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    tweetType: {
        type: String,
        required: true,
    },
}, { timestamps: true });

let dailyTweetsSchema = mongoose.model("DailyTweets", DailyTweetSchema, 'daily_tweets');

export const DailyTweets = dailyTweetsSchema