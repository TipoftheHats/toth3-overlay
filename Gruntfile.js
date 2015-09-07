'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
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
            tasks: ['less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);

};
