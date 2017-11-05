/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb.openConnection;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var Promise = require('bluebird');
module.exports = function (statusId, userId) {

    var databaseConn = undefined;
    mongoDbConnection()
        .then(databaseConnection => {
            databaseConn = databaseConnection;
            return getReplies(databaseConn, statusId)
        })
        .then(replies => getStatus(databaseConn, statusId, userId, replies))
        .then(statusResult => {
            databaseConn.close();
            res.status(200).send(statusResult)
        })
        .catch(err => {
            databaseConn.close();
            res.status(500).send(err.stack)
        });

};

var getStatus = function (databaseConnection, statusId, userId, replies) {
    return databaseConnection.collection('status')
        .find({ "_id": ObjectID(statusId) })
        .toArray()
        .then(statusRes => {
            var doc = statusRes[0] || undefined;
            doc.replies = dbres;
            var likeIndex = _.findIndex(doc.emotions.like, function (o) { return o == userId; });
            var dislikeIndex = _.findIndex(doc.emotions.dislike, function (o) { return o == userId; });
            if (likeIndex != -1)
                doc.userstatusEmotion = 'like'

            if (dislikeIndex != -1)
                doc.userstatusEmotion = 'dislike'

            doc.likeCount = doc.emotions.like.length;
            doc.dislikeCount = doc.emotions.dislike.length
            delete doc.emotions;
            return Promise.resolve(doc);
        })
        .catch(error => { return Promise.reject(error) });
};

var getReplies = function (databaseConnection, statusId) {
    return databaseConnection.collection('status')
        .find({
            "parentId": statusId,
            "type": "commentText"
        }).sort({ timeStamp: 1 }).toArray()
        .then(replies => {
            _.forEach(replies, function (eachReply) {
                eachReply.likeCount = eachReply.emotions.like.length;
                eachReply.dislikeCount = eachReply.emotions.dislike.length
                delete eachReply.emotions
            })
            return Promise.resolve(replies);
        })
        .catch(error => { return Promise.reject(error) });
};