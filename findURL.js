const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const safeSite = require("./safeSite");

const findURL = () => {
  return fs.readFileAsync(`${__dirname}/urls.json`, "utf8").then(txt => {
    console.log("readfile");
    const { urls } = JSON.parse(txt);
    console.log("parsed to json");
    const i = Math.floor(Math.random() * urls.length);
    const url = urls[i]["url"];
    console.log("checking safety");
    // return safeSite(url).then(safety => {
    //   console.log(safety);
    //   return safety.safe ? safety.site : findURL();
    // });
    return url;
  });
};

module.exports = findURL;
