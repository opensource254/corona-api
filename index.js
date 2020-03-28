const express = require('express');
const d3_dsv = require('d3-dsv');
const util = require('util');
const request = require('request');

const app = express();
const get = util.promisify(request.get);

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
    get_data()
        .then(response => res.json(response))
        .catch((e) => {
            res.json({
                "message": "unable to load the data",
                "error": e
            });
        })
});

let get_data = () => {
    let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    return get({ url })
        .then(resp => resp.body)
        .then(text => {
            return d3_dsv.csvParse(text)
        }).catch((e) => {
            return {
                "message": "unable to load the data"
            };
        })
}

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});