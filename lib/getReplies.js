/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb2;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var Promise = require('bluebird');
module.exports = function (statusId) {
    return Promise.using(mongoDbConnection(), conn => {
        return conn.collection('status')
            .find({
                "parentId": statusId,
                "type": "commentText"
            })
            .sort({ timeStamp: 1 })
            .toArray()
            .then(documents => {
                _.forEach(documents, function(eachReply) {
                    eachReply.likeCount = eachReply.emotions.like.length;
                    eachReply.dislikeCount = eachReply.emotions.dislike.length
                    delete eachReply.emotions
                })
                return Promise.resolve(documents);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }).catch(err => {
        return Promise.reject(err);
    });
};
