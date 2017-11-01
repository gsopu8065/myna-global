/**
 * Created by srujangopu on 6/4/17.
 */
var Promise = require("bluebird");
var s3Upload = Promise.promisifyAll(require('myna-server').s3Upload);
var logwriter = require('myna-server').logwriter;

module.exports = function (status, files) {
    return new Promise((resolve, reject) => {
        var keys = [];
        Promise.map(Array.from(Array(status.count).keys()), function(index) { 
            var key = getUniqueId(status.userId, index);
            var config = getConfig(key, files, index)
            keys.push("https://s3.us-east-2.amazonaws.com/"+"sample8065"+"/"+key);
            return s3Upload.putObjectAsync(config)
        }).then((media) => {
            status.media = keys;
            return resolve(status);
        }).catch((err) => {
            return reject(err);
        });
    });
};

function getConfig(key, files, index){
    return {
        Bucket: 'sample8065',
        Key: key,
        ACL: 'public-read',
        Body: files[index].data,
        ContentType: files[index].mimetype
    };
}

function getUniqueId(userid, index) {
    return userid+index+'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }