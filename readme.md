# twitter-rate-limit

> Extends the [twitter](https://www.npmjs.com/package/twitter) client with the respect of rate limits


## Install

```
$ npm install --save twitter-rate-limit
```


## Usage

```js

var Twitter = require('twitter');
var twitter = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var twitterRateLimit = require('twitter-rate-limit');

twitterRateLimit(twitter, 1000 * 60 * 5);

```


## API

### twitterRateLimit(twitter, [wait], [onlimit])

#### twitter

Type: `Twitter`

Instance of the [twitter](https://www.npmjs.com/package/twitter) module Twitter class.

#### wait

Type: `number`<br/>
Default: `300 000` (5 min)

Time (in ms) to wait if twitter response with a 429 (to many requests) response

##### onlimit

Type: `Function`

Function to call if a wait occured


## License

MIT © [Viktor Braun (v_b)](http://www.dev-things.net)
