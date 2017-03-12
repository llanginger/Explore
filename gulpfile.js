var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var sass = require("gulp-sass")
var plumber = require("gulp-plumber");
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
			.pipe(gulp.dest("build"));
});

gulp.task("copy-resources", function() {
	return gulp.src("./src/client/resources/icons/*")
		.pipe(gulp.dest("./build/resources/icons/"))
})

gulp.task('sass', function () {
  return gulp.src('./src/styles/styles.scss')
    .pipe(plumber({
        errorHandler: function(error) {
            console.log(error.message);
            this.emit('end');
        }
    }))
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task("copy-css", function() {
	return gulp.src("./src/styles/vendor/*")
		.pipe(gulp.dest("./build"))
})

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

function bundle() {
	return watchedBrowserify
		.bundle()
		.on('error', function (error) { console.error(error.toString()); })
		.pipe(source("bundle.js"))
		.pipe(gulp.dest("build"))
}
gulp.task("default", ["copy-html", "sass:watch", "copy-css"], bundle)

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log)
