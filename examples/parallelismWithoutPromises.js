var doWork = function(input, callback) {
  var timeout = Math.random() * 1000 + (1000 * input);
  setTimeout(function() {
    console.log('do work on', input, 'timeout', timeout);
    if (input > 5) {
      return callback(new Error('input too big'), null);
    }
    callback(null, input);
  }, timeout);
};

var delegateWork = function(input, callback) {
  var results = [];
  var count = 0;
  input.forEach(function(item) {
    doWork(item, function(error, result) {
      if (error) {
        return callback(error, null);
      } 
      results.push(result);
      count++;
      if (count === input.length) {
        console.log('all work done');
        return callback(null, results);
      }
    });
  });
};

// delegateWork(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], function(err, results) {
//   console.log('all results', results);
// });

delegateWork([1, 2, 3, 4, 5, 6, 7].reverse(), function(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log('all results', results);
  }
});