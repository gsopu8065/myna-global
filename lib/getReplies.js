/**
 * Created by srujangopu on 6/4/17.
 */
var mongoDbConnection = require('myna-server').mongoDb;

module.exports = function (statusId) {

    mongoDbConnection(function (databaseConnection) {

        databaseConnection.collection('status', function (error, collection) {

            collection.find({
                "parentId": statusId,
                "type": "commentText"
            }).sort({timeStamp: 1}).toArray(function (err, statusReplies) {

                if (err)
                    return Promise.reject(err);

                return Promise.resolve(statusReplies);
            });
        });
    });
};
