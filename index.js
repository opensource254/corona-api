const express = require('express');
const d3_dsv = require('d3-dsv');
const util = require('util');
const request = require('request');

const app = express();
const get = util.promisify(request.get);

app.set('port', (process.env.PORT || 5000));

// route index
app.get('/:country*?', (req, res) => {
    if (req.params.country) {
        get_data()
            .then(response => {
                let data = {}
                response.forEach(country => {
                    if (Object.values(country).some(element => element.toLowerCase() === req.params.country.toLowerCase())) {
                        data = country
                    }
                })
                res.send(data);
            }).catch(e => console.log(e))
    } else {
        // fetch the data
        get_data()
            .then(response => res.json(response));
    }
});

// function that fetches and returns the parsed data 
let get_data = () => {
    let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    return get({ url })
        .then(resp => resp.body) //return the body of the response
        .then(text => {
            let jsonData = d3_dsv.csvParse(text);
            let tempArray = []
                // loop through the data
            jsonData.forEach(element => {
                // assign the value of last property to a variable
                let total = element[Object.keys(element).pop()]
                    // delete the last property
                delete element[Object.keys(element).pop()]
                    // assign a new property total to the total value
                element['total'] = total
                    // push the new element to the tempArray
                tempArray.push(element)
            });
            // return the tempArray
            return tempArray;
        }).catch((e) => {
            // on error
            return [{
                "message": "unable to load the data",
                'error': e
            }];
        })
}

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});