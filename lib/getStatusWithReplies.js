/**
 * Created by srujangopu on 6/4/17.
 */
var getStatus = require('./getStatus');
var getReplies = require('./getReplies');
var Promise = require('bluebird');
module.exports = function (statusId, userId) {
    getStatus(statusId)
        .then(statusRes => {
            getReplies
                .then(statusReplies => {
                    statusRes.replies = statusReplies;
                    return Promise.resolve(statusRes);
                })
                .catch(repliesError => {
                    return Promise.reject(repliesError);
                })
        });
};
