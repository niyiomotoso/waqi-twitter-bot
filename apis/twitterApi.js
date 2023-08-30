import {TwitterApi} from "twitter-api-v2";
import { TWITTER_CRED } from "../constants/config.js";

export const getTwitterClient= () => {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi({appKey: TWITTER_CRED.appKey,
        appSecret: TWITTER_CRED.appSecret,
        accessToken: TWITTER_CRED.accessToken,
        accessSecret: TWITTER_CRED.accessSecret});

// Tell typescript it's a readonly app
    return twitterClient.readOnly;
}

export const sendTextOnlyTweet = async (text) => {
    try {
        const client = getTwitterClient();
        // Upload the chart image to Twitter
        await client.v2.tweet(text);
        return true;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export const sendTextAndMediaTweet = async (text, imageBuffer) => {
    const client = getTwitterClient();
    const mediaId =  await uploadMedia (imageBuffer)
    console.log("mediaId", mediaId)
    // Upload the chart image to Twitter
    await client.v2.tweet(text, {media: {media_ids: [mediaId]}});
    return true;
}

// uploads the media and returns the mediaId
export const uploadMedia = async (imageBuffer) => {
    const client = getTwitterClient();
    // Upload the chart image to Twitter
    return await client.v1.uploadMedia(imageBuffer, {
        media_category: 'tweet_image',
        mimeType: 'image/png'
    });
}
