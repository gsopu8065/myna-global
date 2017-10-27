
var getStatus = require('./getStatus');
var getReplies = require('./getReplies');
var getStatusWithReplies = require('./getStatusWithReplies');
var updateStatusLocation = require('./updateStatusLocation');

module.exports = {
    getStatusWithReplies: getStatusWithReplies,
    getStatus: getStatus,
    getReplies: getReplies,
    updateStatusLocation: updateStatusLocation
};