/**
 * Created by srujangopu on 6/4/17.
 */
var s3Upload = require('myna-server').s3Upload;
var _ = require('lodash');

module.exports = function (status, files) {

    //return Promise.reject(err);
    //return Promise.resolve(statusReplies);

    var media = [];

    _.times(3, function (index) {

        const params = {
            Bucket: 'sample8065',
            Key: '123'+index,
            ACL: 'public-read',
            Body: files[index].data,
            ContentType: file.mimetype
        };

        s3Upload.putObject(params, function(errBucket, dataBucket) {
            if (!errBucket) {
                media.push(dataBucket)
            }
        });

    });

    status.media = media;
    return Promise.resolve(status);

};
