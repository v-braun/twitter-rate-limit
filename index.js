"use strict";

function respectLimits(obj, org, url, params, callback, wait, onlimit){
  function callbackInt(err, data, response){
    if(err){
      if(response.statusCode === 429){
        onlimit(url, params);
        setTimeout(function(){
          org.apply(obj, [url, params, callbackInt]);
        }, wait);
        return;
      }
    }


    return callback(err, data, response);
  }
  org.apply(obj, [url, params, callbackInt]);
}



function wrap(obj, func, wait, onlimit){
  var org = obj[func];
  if(typeof wait === 'function'){
    onlimit = function(){};
  }
  if(typeof wait !== 'number'){
    wait = 1000 * 60 * 5; // 5 min
  }
  if(typeof onlimit !== 'function'){
    onlimit = function(){};
  }

  obj[func] = function(url, params, callback){
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    respectLimits(obj, org, url, params, callback, wait, onlimit);
  };

  return obj;
}

module.exports = function(twitter, wait, onlimit){
  if(!twitter){
    throw Error('parameter twitter should be defined');
  }
  if(!twitter.get){
    throw Error('parameter twitter should has a method "get"');
  }
  if(!twitter.post){
    throw Error('parameter twitter should has a method "post"');
  }

  twitter = wrap(twitter, "get", wait, onlimit);
  twitter = wrap(twitter, "post", wait, onlimit);
  return twitter;
};
