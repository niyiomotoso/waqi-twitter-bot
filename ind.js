import {MultiCitySameCountryMain} from "./workers/MultiCitySameCountryTweet.js";
import {MultiCityMultiCountryMain} from "./workers/MultiCityMultiCountry.js";




async function main() {
    MultiCityMultiCountryMain()
    // MultiCitySameCountryMain()
}

main();
