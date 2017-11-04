/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb2;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var Promise = require('bluebird');
module.exports = function (statusId, userId) {
    return Promise.using(mongoDbConnection(), conn => {
        return conn.collection('status')
            .find({ "_id": ObjectID(statusId) })
            .toArray()
            .then(documents => {
                var doc = documents[0]
                var likeIndex = _.findIndex(doc.emotions.like, function (o) {
                    return o == userId;
                });
                var dislikeIndex = _.findIndex(doc.emotions.dislike, function (o) {
                    return o == userId;
                });
                if (likeIndex != -1) {
                    doc.userstatusEmotion = 'like'
                }
                if (dislikeIndex != -1) {
                    doc.userstatusEmotion = 'dislike'
                }
                doc.likeCount = doc.emotions.like.length;
                doc.dislikeCount = doc.emotions.dislike.length
                delete doc.emotions;
                return Promise.resolve(doc);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }).catch(err => {
        return Promise.reject(err);
    });
};
