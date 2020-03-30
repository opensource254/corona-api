const get_data = require('./fetch-data');

const casesUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
const recoveredUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';


let get_combine_data = () => {
    return Promise.all([get_data(casesUrl), get_data(recoveredUrl), get_data(deathsUrl)])
        .then(([reportedData, recoveredData, deathsData]) => { // spread the response to 3 arrays
            // get the dates from the first object of reportedData
            const [province, country, lat, long, ...dates] = Object.keys(reportedData[0])

            // loop through the reported data
            reportedData.forEach(element => {
                // for each country 
                // the first 4 values are province, country, lat, long and the rest counts of cases per date
                const [province, country, lat, long, ...counts] = Object.values(element)
                    // find data of each country in the other 2 arrays
                let recov = getCountryData(recoveredData, country)
                let dths = getCountryData(deathsData, country)

                // loop though the dates
                dates.forEach((date, i) => {
                    let reported = parseInt(counts[i])
                    let recovered = recov.hasOwnProperty('Country/Region') ? parseInt(recov[date]) : 0
                    let deaths = dths.hasOwnProperty('Country/Region') ? parseInt(dths[date]) : 0

                    element[date] = {
                        reported,
                        recovered,
                        deaths
                    };
                })
            })

            // return combined data
            return reportedData
        })
        .catch(error => [{
            "message": "unable to load the data",
            'error': error
        }])
}

// get country data if it exists in the passed array
let getCountryData = (countriesArray, country) => {
    let countryData = {}
    return countriesArray.find(element => element['Country/Region'].toString().toLowerCase() === country.toLowerCase())
}

module.exports = get_combine_data;