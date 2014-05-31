/*
 * grunt-timestamp-file
 * https://github.com/baofen14787/grunt-timestamp-file
 *
 * Copyright (c) 2014 hugo
 * Licensed under the MIT license.
 */
var crypto = require('crypto');

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('timestamp_file', 'grunt create timestamp file in project', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        //默认参数
        var options = this.options({
            punctuation     :   '.',
            separator       :   '\n ',
            urlRoot         :   '',                          //生成的页面片地址URL根目录地址
            timestampType   :   'md5',  //md5 || time
            timestampFormat :   'yymmddhMMss'
        });

        function ttType(filepath){
            var timeString,
                sourcedata;
            if(options.timestampType == 'md5'){
                sourcedata = grunt.file.read(filepath);
                timeString = md5(sourcedata, options.timestampType).substring(0,10);  //MD5太长 截短一点
            }else{
                timeString = grunt.template.today(options.timestampFormat)
            }
            return timeString;
        }

        function md5(content, encoding) {
            return crypto.createHash('md5').update(content, encoding).digest('hex');
        }

        /**
         * 创建script标签
         * @param filepath
         * @param attr
         * @returns {string}
         */
        function createScript(filepath,attr){
            var version = ttType(filepath),
                url = options.urlRoot + filepath;

            var str = '<script src="'+ url + '?v='+ version +'" ';
            if(typeof attr === 'object'){
                for(var i in attr){
                    str += i + '="' + attr[i] + '" ';
                }
            }
            str += '></script>';
            return str;
        }

        function createStyle(filepath,attr){
            var version = ttType(filepath),
                url = options.urlRoot + filepath;
            var str = '<link rel="stylesheet" type="text/css" media="screen" href='+ url + '?v='+ version +'" ';
            if(typeof attr === 'object'){
                for(var i in attr){
                    str += i + '="' + attr[i] + '" ';
                }
            }
            str += '/>';
            return str;
        }

        function createTimesTamp(filepath,attr){
            //判定文件类型
            var fileTyle = filepath.split('.'),
                tag;
            attr = attr || options.attr;
            fileTyle = fileTyle[fileTyle.length -1];

            switch (fileTyle){
                case 'js':
                    tag = createScript(filepath,attr);
                    break
                case 'css':
                    tag = createStyle(filepath,attr);
            }
            return tag;
        }

        console.info('filepath:', this.files)
        //开始读取文件
        this.files.forEach(function (f) {

            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                //如果文件不存在 则 提示警告
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    // Read file source.
                    return createTimesTamp(filepath);
                }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });



};
