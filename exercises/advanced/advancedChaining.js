/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 * 
 * Given an array of github handles, searchCommonTagsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 * 
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib.js');

// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
lib.setImageTaggerCredentials('tUudTChaH34lrW5KHW1ly9R7djrbFNLGdlT8mur7', 'EZA0QP4sgxs1jAZyWOcCbyaEfpbi9yFTHTwZmekH');

var searchCommonTagsFromGitHubProfiles = function(githubHandles) {

  var authToken;

  return lib.authenticateImageTagger()
    .then(function(token) {
      authToken = token;
      return Promise.all(githubHandles.map(lib.getGitHubProfile));
    })
    .map(function(profile) {
      // console.log(profile);
      return lib.tagImage(profile.avatarUrl, authToken);
    })
    .then(function(tags) {
      // console.log('tags', tags);
      return lib.getIntersection(tags);
    })
    .catch(function(error) {
      console.error(error);
    });

};

// Export these functions so we can unit test them
module.exports = {
  searchCommonTagsFromGitHubProfiles: searchCommonTagsFromGitHubProfiles
};
