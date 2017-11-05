/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var Promise = require('bluebird');
module.exports = function (statusId, userId) {


    mongoDbConnection(function (databaseConnection) {

        databaseConnection.collection('status', function (error, collection) {
            collection.find({
                "parentId": statusId,
                "type": "commentText"
            }).sort({ timeStamp: 1 }).toArray(function (err, dbres) {

                if (err){
                    collection.close();
                    return Promise.reject(err);
                }

                _.forEach(dbres, function (eachReply) {
                    eachReply.likeCount = eachReply.emotions.like.length;
                    eachReply.dislikeCount = eachReply.emotions.dislike.length
                    delete eachReply.emotions
                })

                collection.find({ "_id": ObjectID(statusId) }).next(function (dbErr, doc) {

                    if (dbErr){
                        collection.close();
                        return Promise.reject(dbErr);
                    }

                    doc.replies = dbres;
                    var likeIndex = _.findIndex(doc.emotions.like, function (o) { return o == userId; });
                    var dislikeIndex = _.findIndex(doc.emotions.dislike, function (o) { return o == userId; });
                    if (likeIndex != -1) {
                        doc.userstatusEmotion = 'like'
                    }
                    if (dislikeIndex != -1) {
                        doc.userstatusEmotion = 'dislike'
                    }

                    doc.likeCount = doc.emotions.like.length;
                    doc.dislikeCount = doc.emotions.dislike.length
                    delete doc.emotions;
                    collection.close();
                    return Promise.resolve(doc);
                });
            });
        });
    });

    /* var repliesPromise = Promise.using(mongoDbConnection(), conn => {
         return conn.collection('status')
         .find({
             "parentId": statusId,
             "type": "commentText"
         })
         .sort({ timeStamp: 1 })
         .toArray()
         .then(replies => {
             conn.close();
             _.forEach(replies, function(eachReply) {
                 eachReply.likeCount = eachReply.emotions.like.length;
                 eachReply.dislikeCount = eachReply.emotions.dislike.length
                 delete eachReply.emotions
             })
             return Promise.resolve(replies)
         })
     }).catch(err => {
         conn.close();
         return Promise.reject(err);
     });
 
    
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
                 conn.close();
                 return repliesPromise
                 .then(replies => {
                     doc.replies = replies || [];
                     return Promise.resolve(doc);
                 })
                 .catch(error => {
                     return Promise.reject(err);
                 });
                 //return Promise.resolve(doc);
             })
             .catch(err => {
                 conn.close();
                 return Promise.reject(err);
             });
     }).catch(err => {
         conn.close();
         return Promise.reject(err);
     });*/
};
