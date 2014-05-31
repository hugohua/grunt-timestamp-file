/*
 * grunt-timestamp-file
 * https://github.com/baofen14787/grunt-timestamp-file
 *
 * Copyright (c) 2014 hugo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Configuration to be run (and then tested).
        timestamp_file: {
            options: {
                urlRoot:'https://www.paipai.com/'
            },
            //新增测试用例代码
            script:{
                options: {
                    attr:{
                        charset : "utf-8"
                    }
                },
                src:'test/t2/*.js',
                dest:'tmp/custom_options.html'
            },
            css:{
                src:'test/t2/*.css',
                dest:'tmp/custom_options2.html'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['timestamp_file']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);


};


