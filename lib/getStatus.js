/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

module.exports = function (statusId, userId) {

    mongoDbConnection(function (databaseConnection) {

        databaseConnection.collection('status', function (error, collection) {
            collection.find({"_id": ObjectID(statusId)}).next(function (dbErr, doc) {

                if (dbErr)
                    return Promise.reject(dbErr);

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
            });
        });
    });
};
