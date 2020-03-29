const get_data = require('../helpers/fetch-data');

const casesUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
const recoveredUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';


Promise.all([get_data(casesUrl), get_data(recoveredUrl), get_data(deathsUrl)])
    .then(result => {
        console.log(result)

    })
    .catch(error => console.log(`Error in promises ${error}`))