process.env.NODE_ENV = "production";

const FS = require("fs");
const PATH = require("path");
const HTTP = require("http");
const EXPRESS = require("express");
const COOKIE_PARSER = require("cookie-parser");
const BODY_PARSER = require("body-parser");
const COMPRESSION = require("compression");

const MAX_AGE = 1000 * 60 * 60 * 24 * 365;

const APP = EXPRESS();

/**
 * Compressing
 */
APP.use(COMPRESSION());

/**
 * Cookie processor
 */
APP.use(COOKIE_PARSER());

/**
 * Parsers for POST data
 */
APP.use(BODY_PARSER.urlencoded({
  limit: "500mb",
  extended: true,
  parameterLimit: 50000
}));

APP.use(BODY_PARSER.json({
  limit: "500mb"
}));

/**
 * Point static path to static
 */
APP.use(
    EXPRESS.static(PATH.resolve(__dirname, "./build/static"), {
      etag: true,
      maxAge: MAX_AGE
    })
);
/**
 * Point static path to dist
 */
APP.use(
    EXPRESS.static(PATH.resolve(__dirname, "./build"), {
      etag: true,
      maxAge: MAX_AGE
    })
);
/**
 * Save courses
 */
APP.post("/api/courses", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.status(200);

  try {
    const items = JSON.parse(
        FS.readFileSync("./src/json/all-courses.json", "utf-8")
    );

    items[req.body.key] = req.body.item;

    FS.writeFileSync(
        "./src/json/all-courses.json",
        JSON.stringify(items)
    );

    res.send(JSON.stringify({
      status: true
    }));
  } catch (e) {
    res.send(JSON.stringify({
      status: false
    }));
  }
});
/**
 * Load courses
 */
APP.get("/api/courses", (req, res) => {
  res.status(200);
  res.setHeader("Content-type", "application/json");

  let filestream = FS.createReadStream("./src/json/all-courses.json");
  filestream.pipe(res);
});
/**
 * Catch all other routes and return the index file
 */
APP.get("*", (req, res) => {
  res.status(404);
  res.setHeader("Content-type", "text/html");
  res.send("");
});

/**
 * Get port from environment and store in Express.
 */
APP.set("port", 9993);

HTTP.createServer(APP).listen(9993);
