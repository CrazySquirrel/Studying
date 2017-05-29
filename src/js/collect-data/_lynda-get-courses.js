"use strict";

module.exports = function () {
  const callback = arguments[arguments.length - 1];
  const courses = {};
  const urls = [];
  const promises = [];

  if (location.href.indexOf("www.lynda.com/subject/all") !== -1) {
    const rows = window.document.querySelectorAll(
        ".ltr-section .software-name a"
    );
    rows.forEach(
        (row) => {
          const sectionID = (/\/([0-9]+)-/ig).exec(
              row.getAttribute("href")
          )[1];

          const sectionCount = parseInt(
              row.querySelector("span").innerText.replace(/\D+/ig, "")
              , 10);

          const pagesCount = Math.ceil(sectionCount / 50);

          for (let i = 0; i < pagesCount; i++) {
            promises.push(new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();

              xhr.open(
                  "GET",
                  "https://www.lynda.com/ajax/category/" + sectionID
                  + "/courses?page=" + (i + 1),
                  true
              );

              xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    const html = JSON.parse(xhr.responseText);
                    const div = window.document.createElement("div");
                    div.innerHTML = html.html;

                    const rows = div.querySelectorAll(".course");
                    rows.forEach(
                        (row) => {
                          const id = "lynda-" + row.getAttribute(
                                  "data-course-id");
                          courses[id] = {
                            "status": false,
                            "name": row.querySelector("h3").innerText,
                            "description": row.querySelector(
                                ".meta-description").innerText,
                            "link": row.querySelector("a").href,
                            "tags": [
                              row.querySelector(".meta-level").innerText
                            ]
                          };

                          urls.push(row.querySelector("a").href);
                        }
                    );

                    resolve();
                  }
                }
              };

              xhr.send();
            }));
          }

        }
    );
  } else if (location.href.indexOf("lynda") !== -1) {
    const course = window.document.querySelector("#course-page");
    if (course) {
      const id = "lynda-" + course.getAttribute("data-course-id");
      courses[id] = {
        "tags": []
      };
      const tags = course.querySelectorAll("#course-tags a");
      tags.forEach((tag) => {
        courses[id].tags.push(tag.innerText);
      });
    }
  }

  if (promises.length > 0) {
    Promise.all(promises).then(() => {
      callback({
        courses: courses,
        urls: urls.filter((v, i, a) => a.indexOf(v) === i)
      });
    }).catch(() => {
      callback({
        courses: courses,
        urls: urls.filter((v, i, a) => a.indexOf(v) === i)
      });
    });
  } else {
    callback({
      courses: courses,
      urls: urls.filter((v, i, a) => a.indexOf(v) === i)
    });
  }
};
