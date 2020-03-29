const express = require('express');
const get_combined_data = require('../helpers/combined-data');

const router = express.Router();

router.get('/', (req, res) => {
    // fetch the data
    get_combined_data()
        .then(response => res.json(response));
});

router.get('/:country', (req, res) => {
    // fetch the data
    get_combined_data()
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