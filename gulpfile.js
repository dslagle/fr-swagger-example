const gulp = require("gulp");
const tsc = require("gulp-typescript");
const clean = require("gulp-clean");

gulp.task("compile-dev", () => {
    const project = tsc.createProject("./tsconfig.dev.json");

    gulp.src(`${project.config.compilerOptions.outDir}/**/*.js`, { read: false })
        .pipe(clean());

    return project.src()
        .pipe(project()).js
        .pipe(gulp.dest(project.config.compilerOptions.outDir));
});

gulp.task("compile-prod", () => {
    const project = tsc.createProject("./tsconfig.prod.json");

   gulp.src(`${project.config.compilerOptions.outDir}/**/*`, { read: false })
        .pipe(clean()); 

    project.src()
        .pipe(project()).js
        .pipe(gulp.dest(project.config.compilerOptions.outDir));

    gulp.src("src/**/*.json", { base: "src" })
        .pipe(gulp.dest(project.config.compilerOptions.outDir));
});