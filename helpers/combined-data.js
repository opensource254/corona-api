const get_data = require('./fetch-data');

const casesUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
const recoveredUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';


let get_combine_data = () => {
    return Promise.all([get_data(casesUrl), get_data(recoveredUrl), get_data(deathsUrl)])
        .then(result => {
            //combine the data 

            // return combined data
            return result
        })
        .catch(error => [{
            "message": "unable to load the data",
            'error': error
        }])
}

module.exports = get_combine_data;