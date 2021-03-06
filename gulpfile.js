var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var paths = {
    pages: ["src/server/*.html"]
};
var envify = require("envify");

var watchedBrowserify = watchify(
    browserify({
        basedir: ".",
        debug: true,
        entries: ["src/client/app.tsx"],
        cache: {},
        packageCache: {}
    }).plugin(tsify)
);

gulp.task("build-prod", function() {
    var b = browserify({
        basedir: ".",
        debug: true,
        entries: ["src/client/app.tsx"],
        cache: {},
        packageCache: {}
    }).plugin(tsify);

    return b
        .bundle()
        .on("error", function(error) {
            console.error(error.toString());
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on("error", gutil.log)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("build"));
});

gulp.task("copy-html", function() {
    return gulp.src(paths.pages).pipe(gulp.dest("build"));
});

gulp.task("copy-icon-fonts", function() {
    return gulp
        .src("./src/styles/vendor/resources/icons/*")
        .pipe(gulp.dest("./build/resources/icons/"));
});

gulp.task("copy-elements", function() {
    return gulp.src("./src/elements/**/*").pipe(gulp.dest("./build/elements/"));
});

gulp.task("sass", function() {
    return gulp
        .src("./src/styles/styles.scss")
        .pipe(
            plumber({
                errorHandler: function(error) {
                    console.log(error.message);
                    this.emit("end");
                }
            })
        )
        .pipe(sass())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(gulp.dest("./build"));
});

gulp.task("copy-css", function() {
    return gulp.src("./src/styles/vendor/*").pipe(gulp.dest("./build"));
});

gulp.task("sass:watch", function() {
    gulp.watch("./src/styles/**/*.scss", ["sass"]);
});

gulp.task("apply-prod-env", function() {
    process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = "production";
    if (process.env.NODE_ENV != "production") {
        throw new Error("Failed to set NODE_ENV to production!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to production" + "\n");
    }
});

gulp.task("apply-dev-env", function() {
    process.stdout.write("Setting NODE_ENV to 'dev'" + "\n");
    process.env.NODE_ENV = "development";
    if (process.env.NODE_ENV != "development") {
        throw new Error("Failed to set NODE_ENV to development!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to development" + "\n");
    }
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .on("error", function(error) {
            console.error(error.toString());
        })
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("build"));
}

gulp.task(
    "default",
    [
        "copy-html",
        "copy-icon-fonts",
        "copy-elements",
        "apply-dev-env",
        "copy-css",
        "sass",
        "sass:watch"
    ],
    bundle
);
gulp.task(
    "production",
    [
        "copy-html",
        "copy-icon-fonts",
        "copy-elements",
        "apply-prod-env",
        "copy-css",
        "sass",
        "sass:watch"
    ],
    bundle
);

gulp.task("build-production", [
    "copy-html",
    "copy-icon-fonts",
    "copy-elements",
    "apply-prod-env",
    "sass",
    "build-prod"
]);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
