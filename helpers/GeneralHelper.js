import cityJson from "../store/cities.json"  assert { type: "json" };

export const getRandomNumberFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getCountryArrayFromJson = () => {
    let countryArray = [];
    for (const country in cityJson) {
        countryArray.push(country)
    }

    return countryArray;
}

export const getCitiesArrayFromJson = () => {
    let countryArray = [];
    for (const country in cityJson) {
        countryArray.push(country)
    }

    return countryArray;
}

export const getCitiesArrayFromDailyTweetsRecord = (dailyTweetRecord) => {
    let citiesArray = [];
    if (dailyTweetRecord) {
        dailyTweetRecord.forEach(record => {
            citiesArray.push(record.city)
        })
    }

    return citiesArray;
}

export const getCountriesArrayFromDailyTweetsRecord = (dailyTweetRecord) => {
    let countryArray = [];
    if (dailyTweetRecord) {
        dailyTweetRecord.forEach(record => {
            if (!countryArray.includes(record.country)) {
                countryArray.push(record.country)
            }
        })
    }

    return countryArray;
}

export const formatHashTagText = (textArray = []) => {
    let fullText = ""
    textArray.forEach( textString => {
        fullText += `#${textString.replace(/\s/g, '')} `
    })

    // fullText += `#AirQuality #News #Climate #Gogreen #SaveTheEarth #PublicHealth`
    fullText += `#AirQuality#News#PublicHealth`
    return fullText;
}

export const formatToStringText = (textArray = []) => {
    let fullText = ""
    textArray.forEach( textString => {
        fullText += `${textString} `
    })

    return fullText;
}

export const sizeMessageToTwitterLimit = (textMessage) => {
    return textMessage.substring(0, 270);
}

export const getRandomElementsFromArray = (arr, x) => {
    // Create a copy of the original array to avoid modifying it
    const copyArray = [...arr];

    // Check if x is greater than the array length, and if so, return the entire array
    if (x >= copyArray.length) {
        return copyArray;
    }

    const randomElements = [];

    for (let i = 0; i < x; i++) {
        // Generate a random index within the remaining elements
        const randomIndex = Math.floor(Math.random() * copyArray.length);

        // Add the element at the random index to the result array
        randomElements.push(copyArray[randomIndex]);

        // Remove the selected element from the copy array to avoid duplicates
        copyArray.splice(randomIndex, 1);
    }

    return randomElements;
}