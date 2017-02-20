var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
	pages: ["src/server/*.html"]
}

var watchedBrowserify = watchify(browserify({
	basedir: ".",
	debug: true,
	entries: ["src/client/app.tsx"],
	cache: {},
	packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
			.pipe(gulp.dest("build/server"));
});

function bundle() {
	return watchedBrowserify
		.bundle()
		.on('error', function (error) { console.error(error.toString()); })
		.pipe(source("bundle.js"))
		.pipe(gulp.dest("build/server"))
}
gulp.task("default", ["copy-html"], bundle)

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log)
