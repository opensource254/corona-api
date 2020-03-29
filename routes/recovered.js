const express = require('express');
const get_data = require('../helpers/fetch-data');

const router = express.Router();

const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

router.get('/', (req, res) => {
    // fetch the data
    get_data(url)
        .then(response => res.json(response));
});

router.get('/:country', (req, res) => {
    // fetch the data
    get_data(url)
        .then(response => {

            let countryData = {}
                // loop through all the countries
            response.forEach(country => {
                    // for every country
                    // if there is Country/Region is equal to passed country
                    if (country['Country/Region'].toString().toLowerCase() === req.params.country.toLowerCase()) {
                        countryData = country
                    }
                })
                // send the country data back
            res.send(countryData);
        }).catch(e => console.log(e))
});

module.exports = router;