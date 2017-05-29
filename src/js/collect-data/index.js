"use strict";

const fs = require("fs");

let jsons = {};

function loadFiles(files) {
  for (let type in files) {
    if (files.hasOwnProperty(type)) {
      try {
        jsons[type] = JSON.parse(fs.readFileSync(files[type], "utf8"));
      } catch (e) {
        jsons[type] = {};
      }
    }
  }
}

loadFiles({
  "mail": "./src/json/mail-courses.json",
  "egghead": "./src/json/egghead-courses.json",
  "udacity": "./src/json/udacity-courses.json",
  "lynda": "./src/json/lynda-courses.json",
  "all": "./src/json/all-courses.json",
});

function mergeCourses(source, destination) {
  Object.keys(source).forEach((key) => {
    destination[key] = destination[key] || {tags: []};
    destination[key] = {
      status: destination[key].status || source[key].status || false,
      name: destination[key].name || source[key].name || "",
      description: destination[key].description || source[key].description
      || "",
      link: destination[key].link || source[key].link || "",
      tags: destination[key].tags.concat(source[key].tags).filter(
          (value, index, self) => {
            return self.indexOf(value) === index;
          }
      )
    };
  });
}

Object.keys(jsons).forEach((key) => {
  mergeCourses(jsons[key], jsons["all"]);
});

const udacity = require("./_udacity-get-courses");
const egghead = require("./_egghead-get-courses");
const mail = require("./_mail-get-courses");
const lynda = require("./_lynda-get-courses");

const urls = [
  {
    key: "udacity",
    url: "https://www.udacity.com/courses/all",
    processor: udacity
  },
  {
    key: "egghead",
    url: "https://egghead.io/courses",
    processor: egghead
  },
  {
    key: "mail",
    url: "https://it.mail.ru/video/playlists/",
    processor: mail
  },
  {
    key: "lynda",
    url: "https://www.lynda.com/subject/all",
    processor: lynda
  }
];

const links = urls.map(u => u.url);

const webdriver = require("selenium-webdriver");
const chromedriver = require("chromedriver");

let driver = new webdriver
    .Builder()
.withCapabilities({
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['disable-web-security'],
    'binary': '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    'extensions': [],
    'prefs': {
      'profile.managed_default_content_settings.cookies': 2,
      'profile.managed_default_content_settings.images': 2,
      'profile.managed_default_content_settings.plugins': 2,
      'profile.managed_default_content_settings.popups': 2,
      'profile.managed_default_content_settings.geolocation': 2,
      'profile.managed_default_content_settings.notifications': 2,
      'profile.managed_default_content_settings.media_stream': 2
    }
  }
})
.build();

driver.manage().timeouts().pageLoadTimeout(120000);
driver.manage().timeouts().setScriptTimeout(120000);

function loadPage(page) {
  console.log("[" + urls.length + "]" + page.url);
  driver.get(page.url)
  .then(() => {
    return driver.getCurrentUrl();
  })
  .then((currentUrl) => {
    if (
        currentUrl &&
        currentUrl === page.url
    ) {
      driver.executeAsyncScript(page.processor)
      .then((result) => {
        result.urls.filter((v, i, a) => {
          return a.indexOf(v) === i && links.indexOf(v) === -1;
        }).map((url) => {
          urls.push({
            key: page.key,
            url: url,
            processor: page.processor
          });
          links.push(url);
        });

        mergeCourses(result.courses, jsons[page.key]);
        mergeCourses(result.courses, jsons["all"]);

        fs.writeFileSync(
            "./src/json/" + page.key + "-courses.json",
            JSON.stringify(jsons[page.key])
        );

        processUrls();
      })
      .catch((err) => {
        console.log(err);
        processUrls();
      });
    } else {
      console.log(currentUrl);
      loadPage(page);
    }
  })
  .catch((err) => {
    console.log(err);
    loadPage(page);
  });
}

function processUrls() {
  if (urls.length > 0) {
    loadPage(urls.shift());
  } else {
    driver.quit();
    fs.writeFileSync(
        "./src/json/all-courses.json",
        JSON.stringify(jsons["all"])
    );
  }
}

processUrls();
