"use strict";

module.exports = function () {
  const callback = arguments[arguments.length - 1];
  const courses = {};
  const urls = [];
  if (location.href.indexOf("udacity") !== -1) {
    const cards = window.document.querySelectorAll(".course-summary-card");
    cards.forEach(
        (course) => {
          const id = course.getAttribute("id");
          window.nodeHash[id] = Object.assign(
              window.nodeHash[id],
              {
                name: course.querySelector("a[data-course-title]").innerText,
                description: course.querySelector(
                    "div[data-course-short-summary]").innerText,
                link: "https://www.udacity.com/" + course.querySelector(
                    "a[data-course-title]").getAttribute(
                    "href")
              }
          );
        });

    Object.keys(window.nodeHash).forEach((key) => {
      const rawCourse = window.nodeHash[key];

      courses[key] = Object.assign(
          courses[key] || {},
          {
            status: false,
            name: rawCourse.title || rawCourse.name,
            description: rawCourse.description,
            link: rawCourse.link,
            tags: [].concat(
                rawCourse.affiliate_ids,
                rawCourse.technology_ids,
                rawCourse.level_ids,
                rawCourse.other_ids,
                rawCourse.nodeType_ids,
                [rawCourse.legacy ? "" : "new"]
            ).filter((v) => {
              return !!v;
            }).map((v) => {
              return v.toLowerCase().trim().replace(/\s/ig, "-");
            })
          }
      );
    });
  }
  callback({
    courses: courses,
    urls: urls.filter((v, i, a) => a.indexOf(v) === i)
  });
};
