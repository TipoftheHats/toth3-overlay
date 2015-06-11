'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    'view/index.html': ['src/view/index.jade']
                }
            }
        },
        less: {
            dev: {
                files: {
                    'dashboard/overlay.css': ['src/dashboard/overlay.less'],
                    'view/style/toth-scoreboard.css': ['src/view/toth-scoreboard.less']
                }
            }
        },
        watch: {
            files: ['src/**/*.jade', 'src/**/*.less'],
            tasks: ['jade', 'less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jade', 'less']);

};
