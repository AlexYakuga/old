const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const image = require('gulp-image');

const env = process.env.NODE_ENV;

const {
  SRC_PATH,
  DIST_PATH,
  STYLE_LIBS,
  JS_LIBS
}

  = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
  return src(`$ {
        DIST_PATH
      }

      /**/
      *`, {
    read: false
  }
  ).pipe(rm())
}
)

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task('image', () => {
  return src(`${SRC_PATH}/img/**/*.png`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(image());
})

task('styles', () => {
  return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem({
      dpr: 1, rem: 16
    }))
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/styles`))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/scripts`))
    .pipe(reload({ stream: true }));
});

// task('icons', () => {
//   return src('src/img/icons/*.svg')
//     .pipe(svgo({
//       plugins: [
//         {
//           removeAttrs: {
//             attrs: '(fill|stroke|style|width|height|data.*)'
//           }
//         }
//       ]
//     }))
//     .pipe(svgSprite({
//       mode: {
//         symbol: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest(`${DIST_PATH}/img/icons`));
// });

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/img/**/*.png', series('image'));
  watch('./src/img/icons/*.svg', series('icons'));
}

);


task('default',
  series('clean',
    parallel('copy:html', 'styles', 'scripts', 'icons', 'image'),
    parallel('watch', 'server')));

task('build', // без запуска сервера и вотч
  series('clean',
    parallel('copy:html', 'styles', 'scripts', 'image', 'icons')));



  // const { src, dest, task, series, watch } = require("gulp");
  // const rm = require('gulp-rm');
  // const sass = require('gulp-sass');
  // const concat = require('gulp-concat'); // в main.scss положить все стили через import
  // const browserSync = require('browser-sync').create();
  // const reload = browserSync.reload  // for auto reload page
  // const sassGlob = require('gulp-sass-glob');  // про импорт стилей
  // const autoprefixer = require('gulp-autoprefixer');
  // const px2rem = require('gulp-smile-px2rem'); // перевод в px
  // const gcmq = require('gulp-group-css-media-queries'); // группировка медиа запросов
  // const cleanCSS = require('gulp-clean-css'); // очистка ссс
  // const sourcemaps = require('gulp-sourcemaps');  //информация об исходном коде
  // const babel = require('gulp-babel');
  // const uglify = require('gulp-uglify'); // сжаите скрипта
  // const svgo = require('gulp-svgo');  // svg
  // const svgSprite = require('gulp-svg-sprite'); //
  // const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');
  // const { src, dest, task, series, watch, parallel } = require("gulp"); // параллельные

  // sass.compiler = require('node-sass');


  // task('clean', () => {
  //   return src('${DIST_PATH}/**/*', { read: false })
  //     .pipe(rm())
  //   // return src('dist/**/*', { read: false }).pipe(rm()) // не читать перед действием
  // });

  // task('copy:html', () => {                 // для html
  //   return src('${SRC_PATH}/*.html')
  //     .pipe(dest('DIST_PATH'))  //копировать в dist все, перед этим бязательно очистить
  //     .pipe(reload({ stream: true })); // для потоков перезагрузки страницы
  // });

  // task('styles', () => {
  //   return src([...STYLE_LIBS,
  //     'src/styles/main.scss'])

  //     .pipe(sourcemaps.init())
  //     .pipe(concat('main.min.scss'))     //склейка
  //     .pipe(sassGlob()) // для компиляции всех файлов
  //     .pipe(sass().on('error', sass.logError)) // перевод в css
  //     .pipe(px2rem())
  //     .pipe(
  //       autoprefixer({                    // автопрефиксер, работает с css (для подстановки webit и ms)
  //         browsers: ['last 2 versions'],
  //         cascade: false
  //       }))
  //     .pipe(gcmq())
  //     .pipe(cleanCSS())
  //     .pipe(sourcemaps.write())
  //     .pipe(dest(DIST_PATH))  // отключить     .pipe(gcmq())
  //     .pipe(reload({ stream: true }));
  // });

  // const libs = [
  //   'node_modules/jquery/dist/jquery.js',  //сторонние библиотеки
  //   'src/scripts/*.js'
  // ];

  // task('scripts', () => {
  //   return src([...JS_LIBS,
  //     'src/scripts/*.js']) // //поделючаем массив библиотеки src/scripts/*.js

  //     .pipe(sourcemaps.init())
  //     .pipe(concat('main.min.js', { newLine: ';' })) // каждая строка начинается с ;
  //     .pipe(babel({
  //       presets: ['@babel/env']
  //     }))
  //     .pipe(uglify())
  //     .pipe(sourcemaps.write())
  //     .pipe(dest(DIST_PATH))
  //     .pipe(reload({ stream: true }));
  // });

  // task('icons', () => {
  //   return src('src/images/icons/*.svg')
  //     .pipe(svgo({
  //       plugins: [
  //         {
  //           removeAttrs: {
  //             attrs: '(fill|stroke|style|width|height|data.*)' // какие аттрибуты удаляем
  //           }
  //         }
  //       ]
  //     }))
  //     .pipe(svgSprite({
  //       mode: {
  //         symbol: {
  //           sprite: '../sprite.svg'
  //         }
  //       }
  //     }))
  //     .pipe(dest(`${DIST_PATH}/images/icons`));
  // });

  // task('server', () => {       // DEV Srever
  //   browserSync.init({
  //     server: {
  //       baseDir: "./dist"
  //     },
  //     open: false // не будет открываться окно с хтмл
  //   });
  // });

  // watch('./src/styles/*.scss', series('styles')); // слежение за стилями
  // watch('./src/*.html', series('copy:html'));
  // watch('./src/scripts/*.js', series('scripts'));
  // watch('./src/images/icons/*.svg', series('icons'));

  // task('default', series('clean', 'copy:html', 'styles', 'scripts', 'icons', 'server'));
  //  // для запуска всего по дефолту