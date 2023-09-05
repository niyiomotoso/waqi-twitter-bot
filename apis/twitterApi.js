import {TwitterApi} from "twitter-api-v2";

export const getTwitterClient= () => {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi({
        appKey: process.env.appKey,
        appSecret: process.env.appSecret,
        accessToken: process.env.accessToken,
        accessSecret: process.env.accessSecret});

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

export const getTrendsByLocation = async () => {
    // Trends of New York
    const client = getTwitterClient();
    const trendsOfNy = await client.v1.trendsAvailable();

    for (const { trends, created_at } of trendsOfNy) {
        for (const trend of trends) {
            console.log('Trend', trend.name, 'created at', created_at);
        }
    }
}

export const sendTextAndMediaTweet = async (text, imageBuffer) => {
    try {
        const client = getTwitterClient();
        const mediaId =  await uploadMedia (imageBuffer)
        console.log("mediaId", mediaId)
        // Upload the chart image to Twitter
        await client.v2.tweet(text, {media: {media_ids: [mediaId]}});
        return true;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

// uploads the media and returns the mediaId
export const uploadMedia = async (imageBuffer) => {
    try {
        const client = getTwitterClient();
        // Upload the chart image to Twitter
        return await client.v1.uploadMedia(imageBuffer, {
            media_category: 'tweet_image',
            mimeType: 'image/png'
        });
    } catch (e) {
        console.log(e)
        throw e;
    }
}
