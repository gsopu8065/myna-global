/**
 * Created by srujangopu on 6/4/17.
 */
var getStatus = require('./getStatus');
var getReplies = require('./getReplies');

module.exports = function (statusId, userId) {

    getStatus(statusId)
        .then(function (statusRes) {
            getReplies
                .then(function (statusReplies) {
                    statusRes.replies = statusReplies;
                    return Promise.resolve(statusRes);
                }, function (repliesError) {
                    return Promise.reject(repliesError);
                })
        }, function (statusError) {
            return Promise.reject(statusError);
        });
};
