var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var paths = [
  "node_modules/angular/angular.min.js",
  "node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
  "node_modules/angularfire/dist/angularfire.min.js",
  "node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js",
  'js/**/*'
];

gulp.task('scripts', function() {
  return gulp.src(paths)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*', ['scripts']);
});


// /home/caique/Área de Trabalho/Projetos/MasterTech/doacao/bower_components/ngSmoothScroll/dist/angular-smooth-scroll.min.js
// /home/caique/Área de Trabalho/Projetos/MasterTech/doacao/bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js
