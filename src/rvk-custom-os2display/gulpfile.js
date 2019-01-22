/* jshint node: true */
"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const slideFolders = [
  "slides/bib-events"
];
const templatesPath = "Resources/public/templates/";
const jsBuildDir = "Resources/public/dist";
const toolsDir = "Resources/public/apps/tools";

const compileFrontendJs = () => {
  slideFolders.map(function (item) {
    const path = templatesPath + item;
    const fileName = item.split("/").pop() + ".js";
    // Prepend slides-in-slide.js to all files. There is no way to include more
    // than one js file at the time, so it has to be baked in.
    gulp.src(["Resources/public/js/slides-in-slide.js", path + "/" + fileName])
      .pipe(concat(fileName))
      .pipe(uglify())
      .pipe(rename({extname: ".min.js"}))
      .pipe(gulp.dest(jsBuildDir));
  });

  return new Promise(function (resolve) {
    console.log("Frontend JS built");
    resolve();
  });
};

const compileToolsJs = () => {
  gulp.src([
    `${toolsDir}/bib-event-data-editor.js`,
  ])
    .pipe(concat('bbs-tools.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsBuildDir));

  return new Promise(function (resolve) {
    console.log("Tools JS built");
    resolve();
  });
};

const js = gulp.parallel(compileFrontendJs, compileToolsJs);
js.description = 'Compile frontend and tools JS';

exports.js = js;
exports.default = js;
