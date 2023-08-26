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

export const formatHashTagText = (textArray = []) => {
    let fullText = ""
    textArray.forEach( textString => {
        fullText += `#${textString.replace(" ", "")} `
    })

    fullText += `#AirQuality #MyCity #News #Climate #WAQI`
    return fullText;
}
