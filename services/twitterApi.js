import {TwitterApi} from "twitter-api-v2";
import {TWITTER_CRED} from "../constants/config.js";

export const getTwitterClient= () => {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi({appKey: TWITTER_CRED.appKey,
        appSecret: TWITTER_CRED.appSecret,
        accessToken: TWITTER_CRED.accessToken,
        accessSecret: TWITTER_CRED.accessSecret});

// Tell typescript it's a readonly app
    return twitterClient.readOnly;
}