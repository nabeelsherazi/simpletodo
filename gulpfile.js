"use strict";

var Fiber = require("fibers");
var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var browserSync = require("browser-sync").create();

sass.compiler = require("sass"); // Dart Sass

gulp.task("sass", function() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass({ fiber: Fiber }).on("error", sass.logError))
    .pipe(gulp.dest("./public"));
});

gulp.task("sass:sync", function() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass({ fiber: Fiber }).on("error", sass.logError))
    .pipe(gulp.dest("./public").pipe(browserSync.reload({ stream: true })));
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "public"
    }
  });
});

gulp.task("moveHTML", function() {
  return gulp.src("./src/*.html").pipe(gulp.dest("./public"));
});

gulp.task("moveJS", function() {
  return gulp.src("./src/scripts/*.js").pipe(gulp.dest("./public/scripts"));
});

gulp.task("clean", function() {
  return del("./public");
});

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("sass", "moveHTML", "moveJS"))
);

gulp.task("watch", gulp.parallel("sass:sync", "browserSync"), function() {
  gulp.watch("./src/**/*.scss", gulp.series("sass:sync"));
  gulp.watch("src/*.html", gulp.series("moveHTML"), browserSync.reload);
  gulp.watch("app/js/**/*.js", gulp.series("moveJS"), browserSync.reload);
});
