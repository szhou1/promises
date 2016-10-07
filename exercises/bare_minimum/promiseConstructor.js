/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  var p = new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(error, content) {
      if (error) {
        reject(error);
      } else {
        resolve(content.toString().split('\n')[0]);
      }
    });
  });
  return p;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  var p = new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
  
  return p;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
