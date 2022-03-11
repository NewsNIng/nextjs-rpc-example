#!/usr/bin/env zx

const DIST_DIR = "next_dist";
// Clean dir
fs.removeSync(DIST_DIR);
fs.mkdirsSync(DIST_DIR);

// Copy Files
fs.copySync(".next/standalone", DIST_DIR, {
  filter(src, dest) {
    if (src.startsWith(".next/standalone/src")) {
      return false;
    }
    return true;
  },
});
// Recommend CDN
fs.copySync(".next/static", path.join(DIST_DIR, ".next/static"));
fs.copySync("public", path.join(DIST_DIR, "public"));

// fs.copySync("next.config.js", path.join(DIST_DIR, "next.config.js"));
// fs.copySync("yarn.lock", path.join(DIST_DIR, "yarn.lock"));

// Fix server.js (Tars IP PORT)
const serverJSStr = fs.readFileSync(path.join(DIST_DIR, "server.js"), "utf-8");

// nextjs <= 12
// const fixServerJSStr = serverJSStr
//   .replace(
//     "process.env.PORT || 3000",
//     `{
//       host: process.env.IP || "localhost",
//       port: process.env.PORT || 3000,
//       test: "test"
//   }`
//   )
//   .replace(
//     `console.log("Listening on port", currentPort)`,
//     `console.log("Listening on port", JSON.stringify(currentPort, null, 4))`
//   );

// nextjs >= 12.1
const fixServerJSStr = serverJSStr
  .replace(
    "parseInt(process.env.PORT, 10) || 3000",
    `{
          host: process.env.IP || "localhost",
          port: process.env.PORT || 3000,
          test: "test"
      }`
  )
  .replace(
    `console.log("Listening on port", currentPort)`,
    `console.log("Listening on ip", process.env.IP || 'localhost');console.log("Listening on port", currentPort);`
  );

fs.outputFileSync(path.join(DIST_DIR, "server.js"), fixServerJSStr);

// install

// await $`cd ${DIST_DIR} && yarn install --production`

// Tars Deploy
// TODO...
