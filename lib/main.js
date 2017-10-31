
var getStatus = require('./getStatus');
var getReplies = require('./getReplies');
var getStatusWithReplies = require('./getStatusWithReplies');
var updateStatusLocation = require('./updateStatusLocation');
var saveImagesOnS3 = require('./saveImagesOnS3');

module.exports = {
    getStatusWithReplies: getStatusWithReplies,
    getStatus: getStatus,
    getReplies: getReplies,
    updateStatusLocation: updateStatusLocation,
    saveImagesOnS3:saveImagesOnS3
};