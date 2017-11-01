/**
 * Created by srujangopu on 6/4/17.
 */
var Promise = require("bluebird");
var s3Upload = Promise.promisifyAll(require('myna-server').s3Upload);
var logwriter = require('myna-server').logwriter;

module.exports = function (status, files) {

    return new Promise((resolve, reject) => {
    
        var promises = [];
        for (var i = 0; i < status.count; ++i) {
            const params = {
                Bucket: 'sample8065',
                Key: '123'+index,
                ACL: 'public-read',
                Body: files[index].data,
                ContentType: files[index].mimetype
            };
            promises.push(s3Upload.putObjectAsync(params));
        }
        Promise.all(promises).then(function(media) {
            console.log("done", media);
            status.media = media;
            return Promise.resolve(status);
        });

        
        
    });
};
