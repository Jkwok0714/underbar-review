(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    return n === undefined ? array[array.length - 1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let result = [];
    for (let i = 0; i < collection.length; i++) {
      if (test(collection[i])) {
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, (el) => {
      if (!test(el)) {
        return el;
      }
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator = undefined) {
    if (iterator === undefined) {
      let set = new Set(array);
      return [...set];
    }
    let result = [];
    let set = new Set();
    _.each(array, (el) => {
      if (!set.has(iterator(el))) {
        result.push(el);
        set.add(iterator(el));
      }
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let result = [];
    _.each(collection, (el) => {
      result.push(iterator(el));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator = undefined) {
    let result;
    let start = 0;
    if (Array.isArray(collection)) {
      if (accumulator === undefined) {
        start++;
        accumulator = collection[0];
      }
      for (let i = start; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      let keys = Object.keys(collection);
      if (accumulator === undefined) {
        start++;
        accumulator = collection[keys[0]];
      }
      for (let i = start; i < keys.length; i++) {
        accumulator = iterator(accumulator, collection[keys[i]]);
      }
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator = _.identity) {
    // TIP: Try re-using reduce() here.
    // let isFailed = false;
    return _.reduce(collection, (wasFound, item) => {
      if (!wasFound) {
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator = _.identity) {
    // TIP: There's a very clever way to re-use every() here.
    return !_.every(collection, (el) => {
      return !iterator(el);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj, ...args) {
    _.each(args, (arg) => {
      for (let key in arg) {
        obj[key] = arg[key];
      }
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj, ...args) {
    _.each(args, (arg) => {
      for (let key in arg) {
        if (obj[key] === undefined) {
          obj[key] = arg[key];
        }
      }
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let cache = {};
    let result;

    return function() {
      let args = JSON.stringify(arguments);
      if (cache[args] === undefined) {
        result = func.apply(this, arguments);
        cache[args] = result;
        return result;
      } else {
        return cache[args];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(...args) {
    setTimeout(...args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i - 1));
      [result[i], result[random]] = [result[random], result[i]];
    }

    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, ...args) {
    const method = typeof functionOrKey === 'string' ? collection[0][functionOrKey] : functionOrKey;
    const result = _.map(collection, (el) => {
      return method.apply(el, ...args);
    });

    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator = _.identity) {
    const method = typeof iterator === 'string' ? (el) => el[iterator] : iterator;
    const recurse = function recurseToSort(collection, low, high) {
      if (low < high) {
        const pi = partition(collection, low, high);

        recurse(collection, low, pi - 1);
        recurse(collection, pi + 1, high);
      } else {
        return;
      }
    };

    const partition = function sortPartition(collection, low, high) {
      let lowFlag = low - 1;
      const pivotVal = method(collection[high]);
      for (let i = low; i < high; i++) {
        const curVal = method(collection[i]);
        if (curVal <= pivotVal) {
          lowFlag++;
          [collection[lowFlag], collection[i]] = [collection[i], collection[lowFlag]];
        }
      }
      [collection[lowFlag + 1], collection[high]] = [collection[high], collection[lowFlag + 1]];
      return lowFlag + 1;
    };
    recurse(collection, 0, collection.length - 1);

    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(...args) {
    let max = args[0].length;
    _.each(args, (el) => {
      if (el.length > max) {
        max = el.length;
      }
    });
    let result = [];
    for (let i = 0; i < max; i++) {
      let temp = [];
      _.each(args, (el) => {
        temp.push(el[i]);
      })
      result.push(temp);
    }

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result = []) {
    _.each(nestedArray, (el) => {
      if (Array.isArray(el)) {
        result = _.flatten(el, result);
      } else {
        result.push(el);
      }
    })

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(...args) {
    let result = [];

    args = _.sortBy(args, (el) => {
      el = _.sortBy(el, (cur) => cur);
      return el.length;
    });
    let pointer = new Array(args.length).fill(0);
    for (let i = 0; i < args[0].length; i++) {
      let match = args[0][i];
      let isFound = true;
      for (let j = 1; j < args.length; j++) {
        let curVal = args[j][pointer[j]];
        if (curVal === match) {
          continue;
        } else if (curVal < match) {
          while (curVal < match && pointer[j] < args[j].length) {
            pointer[j]++;
            curVal = args[j][pointer[j]];
          }
          if (curVal === match) {
            continue;
          } else if (pointer[j] === args[j].length) {
            return result;
          } else {
            isFound = false;
            break;
          }
        }
      }
      if (isFound) {
        result.push(match);
      }
    }

    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array, ...args) {

    let result = [];
    _.each(args, (el) => {
      return el = _.sortBy(el, (cur) => cur);
    });

    let pointer = new Array(args.length).fill(0);
    for (let i = 0; i < array.length; i++) {
      let match = array[i];
      let isFound = false;
      for (let j = 0; j < args.length; j++) {
        let curVal = args[j][pointer[j]];
        if (curVal === match) {
          isFound = true;
          break;
        } else if (curVal < match) {
          while (curVal < match && pointer[j] < args[j].length) {
            pointer[j]++;
            curVal = args[j][pointer[j]];
          }
          if (curVal === match) {
            isFound = true;
            break;
          }
        }
      }
      if (!isFound) {
        result.push(match);
      }
    }

    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let inTimeout = false;
    let calledDuringTimeout = false;

    return function decorator() {
      if (!inTimeout) {
        inTimeout = true;
        setTimeout(() => {
          inTimeout = false;
          if (calledDuringTimeout) {
            decorator();
            calledDuringTimeout = false;
          }
        }, wait);
        return func.apply(this);
      } else {
        calledDuringTimeout = true;
        return;
      }
    };
  };
}());
