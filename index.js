const Twit = require("./twit");
const findURL = require("./findURL");
const axios = require("axios");
const ico = require("icojs");

let mediaIDString = "";

exports.handler = () => {
  let siteName;
  findURL()
    .then(site => {
      siteName = site;
      console.log(`getting favicon from ${site}...`);
      return axios.get(`http://${site}/favicon.ico`, {
        responseType: "arraybuffer"
      });
    })
    .then(response => {
      console.log(response.statusText);
      console.log(`parsing ico...`);
      return ico.parse(new Buffer(response.data, "binary"), "image/png");
    })
    .then(images => {
      console.log("parsed");
      // const [image] = images.filter(image => (image.width >= 32));
      // console.log("uploading");
      images.forEach((image, i) => {
        const buffer = Buffer.from(image.buffer);
        const b64 = buffer.toString("base64");
        fs.writeFileSync(`img/${siteName}_${image.width || i}.png`, buffer);

      })
      
      // console.log("written ---- now to upload!");
      // return Twit.post("media/upload", { media_data: b64 });
    })
    // .then(data => {
      // console.log("posting");
      // mediaIDString = data.data.media_id_string;
      // console.log(mediaIDString);
      // let meta = { media_id: mediaIDString };
      // return Twit.post("media/metadata/create", meta);
    // })
    .then(res => {
      // console.log(mediaIDString);
      // Twit.post("statuses/update", {
      //   media_ids: [mediaIDString]
      // });
      exports.handler();
    })
    .catch(error => {
      console.log(`error: ${error} ---- restarting exports.handler`);
      exports.handler();
    });
};
