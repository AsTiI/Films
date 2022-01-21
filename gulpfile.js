const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const gulpfile = require("gulp");
const nodemon = require("gulp-nodemon");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglifyjs');

// NodemonStart
// Таск для старта Nodemon - автоматическая перезагрузка сервера
function nodemonStart(cb) {
    let callbackCalled = false;
    return nodemon({script: './server.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
}

// BrowserSync
// Таск для автоматической перезагрузки бразуера при изменениях
function browserSync(done) {
    browsersync.init({
        logPrefix: 'zzZZZ',
        proxy: 'http://localhost:8080',
        notify: false
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}


// CSS task
function css() {
    return gulpfile
        .src("./public/styles/src/**/*.css")
        .pipe(plumber())
        .pipe(concat('index.css'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulpfile.dest("./public/styles/dist/"))
        .pipe(plumber())
        .pipe(browsersync.stream());
}


function js() {
    return gulpfile
        .src(['./public/scripts/src/**/*.js',])
        .pipe(concat('index.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(plumber())
        .pipe(gulpfile.dest('./public/scripts/dist'))
}


function jsLibs() {
    return gulp
        .src([
            './node_modules/jquery/dist/jquery.min.js',
        ])
        .pipe(concat('libs.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/scripts/dist'))
}

function cssLibs() {
    return gulp
        .src([
            './node_modules/uikit/dist/css/uikit.min.css',
        ])
        .pipe(concat('libs.css'))
        .pipe(plumber())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('./styles/dist'))
}


// Watch files
function watchFiles() {
    gulpfile.watch("./public/styles/src/**/*", css);
    gulpfile.watch("./public/scripts/src/**/*", js);
    gulpfile.watch("./public/scripts/dist/*", browserSyncReload);
    gulpfile.watch("./public/styles/dist/*", browserSyncReload);
    gulpfile.watch("./server.js", browserSyncReload)
}

// define complex tasks
const build = gulpfile.parallel(/*cssLibs, jsLibs, */js, css);
const watch = gulpfile.parallel(/*cssLibs, jsLibs, */js, css, watchFiles, nodemonStart, browserSync);

// export tasks
exports.css = css;
// exports.cssLibs = cssLibs;
// exports.jsLibs = jsLibs;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;