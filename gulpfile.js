const gulp = require("gulp");
const tsc = require("gulp-typescript");

gulp.task("compile-dev", () => {
    const project = tsc.createProject("./tsconfig.json");
    return project.src()
        .pipe(project());
});

gulp.task("compile-prod", () => {
    const project = tsc.createProject("./tsconfig.prod.json");
    return project.src()
        .pipe(project());
});