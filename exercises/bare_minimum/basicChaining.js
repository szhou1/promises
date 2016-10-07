/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var github = require('./promisification');
var helper = require('./promiseConstructor');
var request = require('request');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  var p = helper.pluckFirstLineFromFileAsync(readFilePath);

  p.then(function(firstline) {
    return github.getGitHubProfileAsync(firstline);
  })
  .then(function(profile) {
    fs.writeFile(writeFilePath, JSON.stringify(profile));
  });

  p.catch(function(err) {
    console.log(err);
  });

  return p;
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
