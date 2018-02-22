const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); // plugin gulp ottimizza img
const uglify = require('gulp-uglify'); // plugin gulp minification files
const sass = require('gulp-sass'); // plugin per compilare sass
const concat = require('gulp-concat'); // plugin per concatenare files

/*

    --TOP LEVEL FUNCTIONS--

    gulp.task - definisce tasks
    gulp.src - punta il file da usare
    gulp.dest - punta la cartella per l'output
    gulp.watch - controlla files e cartelle per cambiamenti

*/

// messaggi di log

gulp.task('message', function(){
    return console.log('Gulp is running...');
});

gulp.task('default', function(){
    return console.log('Gulp is running...');
}); 

// Copia tutti i files HTML 
gulp.task('copyHtml', function(){
    gulp.src('src/*.html') // copia tutti i files html in ./src
        .pipe(gulp.dest('dist')); // li incolla in ./dist
});

// Ottimizza le immagini
gulp.task('imageMin', () => 
    gulp.src('src/images/*') // prende tutte le immagini
        .pipe(imagemin()) // le ottimizza
        .pipe(gulp.dest('dist/images')) // le incolla in ./dist/images
);

// Minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compila i files SASS
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
})

// Esegue tutti i task nell'array
gulp.task('all', ['message', 'copyHtml', 'imageMin', 'minify', 'sass']);

// Concatena più files js in un unico file 
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat())
    //  .pipe(uglify()) posso eseguire la minification con esso
        .pipe(gulp.dest('dist/js'));
})