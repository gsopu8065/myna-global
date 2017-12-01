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
            keys.push("https://s3."+process.env.MYNA_AWS_REGION+".amazonaws.com/"+process.env.MYNA_AWS_S3_BUCKET+"/"+key);
            return s3Upload.upload(config).send(function(err, data) {
                    if(err){
                        return reject(err);
                    }
                    else{
                        status.media = keys;
                        return resolve(status);
                    }
                    
                });
            });
    });
};

function getConfig(key, files, index){
    return {
        Bucket: process.env.MYNA_AWS_S3_BUCKET,
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