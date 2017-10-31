var Promise = require("bluebird");
var geocoder = Promise.promisifyAll(require('geocoder'))

module.exports = function (status) {

    /*geocoder.reverse({lat:45.767, lon:4.833})
    .then(function(data) {
        return Promise.resolve(data);
    })
    .catch(function(err) {
        //Write error logs
        return Promise.reject(err);
    });*/
 
 geocoder.reverseGeocodeAsync(status.location[1],status.location[0])
 .then(function(data) {
        return Promise.resolve(data);
    })
    .catch(function(err) {
        //Write error logs
        return Promise.reject(err);
    });
 
    
    /*geocoder.reverseGeocode(status.location[1],status.location[0], function ( err, data ) {

        if (err) {
            return Promise.reject(err);
        }

        var stateModule = _.find(data.results[0].address_components, function(o) {
            return _.indexOf(o.types, "administrative_area_level_1") != -1
        });

        var cityModule = _.find(data.results[0].address_components, function(o) {
            return (_.indexOf(o.types, "locality") != -1) || (_.indexOf(o.types, "political") != -1)
        });

        if(cityModule != undefined){
            status.city = cityModule.short_name;
        }
        if(stateModule != undefined){
            status.state = stateModule.short_name;
        }
        return Promise.resolve(status);
    });*/
};
