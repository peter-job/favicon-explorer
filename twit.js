const Twit = require("twit");
const {
  api_key,
  api_secret,
  access_token,
  access_secret
} = require("./config/config");

module.exports = new Twit({
  consumer_key: api_key,
  consumer_secret: api_secret,
  access_token: access_token,
  access_token_secret: access_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});
