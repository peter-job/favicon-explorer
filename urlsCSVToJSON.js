const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));

fs.readFileAsync(`${process.cwd()}/majestic_million_reduced.csv`, "utf8")
  .then(txt => {
    const rows = txt.split("\n");
    return rows.map(row => {
      const [rank, url] = row.split(",");
      return { rank, url };
    }).filter(site => site.url && !site.url.includes(".com"));
  })
  .then(urls => {
    fs.writeFileAsync(
      `${process.cwd()}/urls.json`,
      JSON.stringify({ urls }, null, 2)
    );
  })
  .then(console.log("urls written to file"))
  .catch(console.log());
