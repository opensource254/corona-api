const d3_dsv = require('d3-dsv');
const util = require('util');
const request = require('request');

const get = util.promisify(request.get);

// function that fetches and returns the parsed data 
let get_data = (url) => {
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

module.exports = get_data;