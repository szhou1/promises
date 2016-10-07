/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var Promise = require('bluebird');
var helper = require('../bare_minimum/promiseConstructor');
var fs = require('fs');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // console.log(filePaths);

  var resolutions = filePaths.map((file) => {
    return helper.pluckFirstLineFromFileAsync(file);
  });
  // console.log(resolutions);
  var p = Promise.all(resolutions)
  .then((value) => { return (value.join('\n')); } )
  .then((stringToWrite) => {
    // console.log(stringToWrite);
    fs.writeFile(writePath, stringToWrite);
  });

  return p;
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};