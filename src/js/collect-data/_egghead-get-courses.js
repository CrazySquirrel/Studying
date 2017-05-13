"use strict";

module.exports = function () {
  const callback = arguments[arguments.length - 1];
  const courses = {};
  const urls = [];
  if (location.href.indexOf("egghead") !== -1) {
    const sets = window.document.querySelectorAll(".technology-set");
    sets.forEach(
        (technology) => {
          try {
            const tag = technology.getAttribute("id").replace("technology-",
                "");

            technology.querySelectorAll(".card-course").forEach((card) => {
              try {
                const course = {
                  status: false,
                  name: card.querySelector(".course-title").innerText,
                  description: card.querySelector(
                      ".description-text").innerText,
                  link: card.querySelector(".link-overlay").getAttribute(
                      "href"),
                  tags: [
                    tag
                  ].filter((v) => {
                    return !!v;
                  }).map((v) => {
                    return v.toLowerCase().trim().replace(/\s/ig, "-");
                  })
                };

                const id = course.link.replace("https://egghead.io/courses/",
                    "");

                courses[id] = Object.assign(
                    courses[id] || {},
                    course
                );
              } catch (e) {
                console.error(e);
              }
            });
          } catch (e) {
            console.error(e);
          }
        });
  }
  callback({
    courses: courses,
    urls: urls.filter((v, i, a) => a.indexOf(v) === i)
  });
};
