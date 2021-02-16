const { src, dest, task, series } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm()) // не читать перед действием
});

task('copy', () => {
  return src('src/styles/*.scss').pipe(dest('dist'));  //копировать в dist все scss, перед этим бязательно очистить
}
);

task('styles', () => {
  return src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'));
});

task('default', series('clean', 'styles'))  // для запуска всего по дефолту





// Первый вариант с ручным удалением и добавлением

// const { src, dest, task } = require("gulp");
// const rm = require('gulp-rm');

// task('clean', () => {
//   return src('dist/**/*', { read: false }).pipe(rm()) // не читать перед действием
// })

// function copy() {
//   return src('src/styles/*.scss').pipe(dest('dist'));  //копировать в dist все scss, перед этим бязательно очистить
// }

// exports.copy = copy;

