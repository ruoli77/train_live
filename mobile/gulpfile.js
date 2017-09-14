
'use strict';
//导入工具包 require('node_modules里对应模块')

//引入gulp
var gulp = require('gulp');//本地安装gulp所用到的地方

//引入PostCss
var postcss = require('gulp-postcss')
    ,px2rem = require('gulp-px3rem')
    ,autoprefixer = require('gulp-autoprefixer')
    ,rename = require('gulp-rename')
    ,uglify = require('gulp-uglify');



gulp.task('jsmin', function () {
    gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('all-output',function(){
    gulp.src(['src/**/*','!src/css/main.css','!src/css/main_train.css'])
        .pipe(gulp.dest('dest/.'));

}); //定义默认任务


gulp.task('px2rem', ['all-output'],function() {
    gulp.src('src/css/main.css',{base: './src'})
        .pipe(px2rem())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dest/css'));
    gulp.src('src/css/main_train.css',{base: './src'})
        .pipe(px2rem())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(rename('main_train.css'))
        .pipe(gulp.dest('dest/css'));

});
gulp.task('default', ['all-output','px2rem']);

var watcher = gulp.watch('src/**/*', ['default']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});






//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径




