import {MultiCitySameCountryMain} from "./workers/MultiCitySameCountryTweet.js";
import {MultiCityMultiCountryMain} from "./workers/MultiCityMultiCountry.js";
import mongoose from "mongoose";
import {MONGO_URL} from "./constants/config.js";



mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log("Database Connected");
});

async function main() {
    // MultiCityMultiCountryMain()
    MultiCitySameCountryMain()
}

main();
