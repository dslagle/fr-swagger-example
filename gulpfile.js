const gulp = require("gulp");
const tsc = require("gulp-typescript");
const del = require("del");

gulp.task("build-dev", () => {
    const project = tsc.createProject("./tsconfig.dev.json");

    del.sync(`${project.config.compilerOptions.outDir}/**/*.js`);

    project.src()
        .pipe(project()).js
        .pipe(gulp.dest(project.config.compilerOptions.outDir));
});

gulp.task("build-prod", () => {
    const project = tsc.createProject("./tsconfig.prod.json");

    del.sync(`${project.config.compilerOptions.outDir}/**/*`);

    project.src()
        .pipe(project()).js
        .pipe(gulp.dest(project.config.compilerOptions.outDir));

    gulp.src("src/**/*.json", { base: "src" })
        .pipe(gulp.dest(project.config.compilerOptions.outDir));
});

gulp.task("build", ["build-dev", "build-prod"]);