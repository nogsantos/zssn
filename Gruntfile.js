/**
 * Grunt v0.1.0
 */
(function () {
    "use strict";
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            dist: "./dist/releases/tag-v<%=pkg.version%>",
            shell: {
                options: {
                    stderr: false
                },
                dist: {
                    command: () => './node_modules/.bin/au build --env prod'
                },
                test: {
                    command: () => './node_modules/.bin/au build'
                },
                dev: {
                    command: () => './node_modules/.bin/au run --watch'
                },
                version: {
                    command: v => `echo ${v} > VERSION`
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        '<%=dist%>/index.html': './index.html'
                    }
                }
            },
            jsonmin: {
                dev: {
                    options: {
                        stripWhitespace: true || false,
                        stripComments: true || false
                    },
                    files: {
                        '<%=dist%>/locales/pt_br/translation.json': './locales/pt_br/translation.json'
                    }
                }
            },
            copy: {
                main: {
                    files: [{
                        expand: true,
                        cwd: '.',
                        src: ['scripts/*-bundle.js'],
                        dest: '<%=dist%>/'
                    }, {
                        expand: true,
                        cwd: '.',
                        src: ['styles/*.css'],
                        dest: '<%=dist%>/'
                    }, {
                        expand: true,
                        cwd: '.',
                        src: ['favicon.ico'],
                        dest: '<%=dist%>/'
                    }, {
                        expand: true,
                        cwd: '.',
                        src: ['images/**'],
                        dest: '<%=dist%>/'
                    }, {
                        expand: true,
                        cwd: '.',
                        src: ['fonts/**/**'],
                        dest: '<%=dist%>/'
                    }],
                },
            }
        });
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-jsonmin');
        grunt.loadNpmTasks('grunt-contrib-copy');
        /**
         * Constroi e gera os arquivos para distribuição
         */
        grunt.registerTask('default', () => {
            grunt.task.run('shell:dist');
            grunt.task.run('htmlmin');
            grunt.task.run('jsonmin');
            grunt.task.run('copy');
        });
    };
}());
