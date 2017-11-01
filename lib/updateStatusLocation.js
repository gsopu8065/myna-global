var Promise = require("bluebird");
var geocoder = Promise.promisifyAll(require('geocoder'));
var logwriter = require('myna-server').logwriter;
var _ = require('lodash');

module.exports = function (status) {

    return new Promise((resolve, reject) => {

        geocoder.reverseGeocodeAsync(status.location[1], status.location[0])
            .then((data) => {
                var stateModule = data.results[0].address_components && _.find(data.results[0].address_components, function (o) {
                    return _.indexOf(o.types, "administrative_area_level_1") != -1
                });

                var cityModule = data.results[0].address_components && _.find(data.results[0].address_components, function (o) {
                    return (_.indexOf(o.types, "locality") != -1) || (_.indexOf(o.types, "political") != -1)
                });

                if (cityModule != undefined) {
                    status.city = cityModule.short_name;
                }
                if (stateModule != undefined) {
                    status.state = stateModule.short_name;
                }
                return resolve(status);
            })
            .catch((err) => {
                logwriter.info(err);
                return resolve(status);
            });
    });
};
