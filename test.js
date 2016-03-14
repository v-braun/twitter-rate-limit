"use strict";

var respectLimits = require('./');
var assert = require('assert');

function createTwitterMock(statusCode, calls){
	var getCount = 0;
	var postCount = 0;
	return {
		get: function(url, param, cb){
			getCount++;
			if(getCount >= calls){
				statusCode = 200;
			}
			cb(new Error('simulated HTTP 429'), {}, {statusCode: statusCode});
		},
		post: function(url, param, cb){
			postCount++;
			if(postCount >= calls){
				statusCode = 200;
			}

			cb(new Error('simulated HTTP 429'), {}, {statusCode: statusCode});
		},
		getCount: function(){
			return getCount;
		},
		postCount: function(){
			return postCount;
		}
	};
}

it('should call the get func twice if the response.statusCode is 429', function(done){
	var twitter = createTwitterMock(429, 2);
	twitter = respectLimits(twitter, 1);

	twitter.get('followers/ids', {stringify_ids: "true"}, function(err, data){
		assert.ok(err);
		assert.deepEqual(data, {});

		assert.equal(twitter.getCount(), 2);
		assert.equal(twitter.postCount(), 0);
		done();
	});
});

it('should call the post func twice if the response.statusCode is 429', function(done){
	var twitter = createTwitterMock(429, 2);
	twitter = respectLimits(twitter, 1);

	twitter.post('followers/ids', {stringify_ids: "true"}, function(err, data){
		assert.ok(err);
		assert.deepEqual(data, {});

		assert.equal(twitter.getCount(), 0);
		assert.equal(twitter.postCount(), 2);
		done();
	});
});
