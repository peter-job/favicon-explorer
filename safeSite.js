const axios = require("axios");
const { cse_id, cse_key } = require("./config/config");

const cse_base_url = "https://www.googleapis.com/customsearch/v1";

module.exports = site => {
  return axios
    .get(
      `${cse_base_url}?q=site:${site}&cx=${cse_id}&key=${cse_key}&searchType=image&alt=json&safe=active`
    )
    .then(res => {
      return res.data.items ? { site, safe: true } : { site, safe: false };
    });
};
