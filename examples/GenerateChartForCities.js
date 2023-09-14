import {getAirQualityByCity} from "../apis/aqicnApi.js";
import {generateBarChart} from "../canvas/ImageGenerator.js";

export const GenerateChartForCities = async () => {
    let citiesArray = [];
    let aqiArray = [];
    let possibleCitiesToFetch = [{cityName: "Johannesburg", countryName: 'SA'},
        {cityName: "Cape Town", countryName: 'SA'}, {cityName: "London", countryName: 'UK'}, {cityName: "New York", countryName: 'USA'},
        {cityName: "Istanbul", countryName: 'Turkey'}, {cityName: "Tokyo", countryName: 'Japan'}];

        for (const possibleCity of possibleCitiesToFetch) {
            await new Promise(resolve => setTimeout(resolve, 20));
            const airQuality = await getAirQualityByCity(possibleCity.cityName);
            let aqIndex = null;
            if (airQuality != null) {
                aqIndex = airQuality?.aqi
                citiesArray.push(`${possibleCity.cityName}, ${possibleCity.countryName}`)
                aqiArray.push(aqIndex)
            } else {
                aqIndex = null;
            }

            console.log("tried ", possibleCity.countryName, possibleCity.cityName, aqIndex)
        }

    await generateBarChart(citiesArray, aqiArray, 'Air Quality of cities around the world')
}