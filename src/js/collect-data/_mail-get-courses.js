"use strict";

module.exports = function () {
  const callback = arguments[arguments.length - 1];
  const courses = {};
  const urls = [];
  if (location.href.indexOf("mail") !== -1) {
    const rows = window.document.querySelectorAll(".bit-process-matrix-row");
    rows.forEach(
        (row) => {
          const course = {
            status: false,
            name: row.querySelector(".favorit-title").innerText,
            description: row.querySelector(".bit-video-text").innerText,
            link: "https://it.mail.ru" + row.querySelector(
                ".favorit-title").getAttribute(
                "href"),
            tags: [
            ].concat(
                Array.from(row.querySelectorAll(".bit-video-tags>a")).map(
                    (tag) => {
                      return tag.innerText;
                    })
            ).filter((v) => {
              return !!v;
            }).map((v) => {
              return v.toLowerCase().trim().replace(/\s/ig, "-");
            })
          };

          const id = "it-mail-" + course.link.replace(
                  "https://it.mail.ru/video/playlists/", "").replace("/", "");

          courses[id] = Object.assign(
              courses[id] || {},
              course
          );
        });
    const links = window.document.querySelectorAll(".pagination a");
    links.forEach((link) => {
      urls.push(link.href);
    });
  }
  callback({
    courses: courses,
    urls: urls.filter((v, i, a) => a.indexOf(v) === i)
  });
};
