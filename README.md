# grunt-timestamp-file

> 创建带时间戳的页面片

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-timestamp-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-timestamp-file');
```

## The "timestamp_file" task

### Overview

该plugin主要用来创建页面片文件，拍拍的同学应该很熟悉。通过页面片来管理css和js的引用，可以非常方便的避免浏览器缓存。


### Options

#### urlRoot
Type: `String`
Default value: `''`

生成script标签或link标签所需要的根目录地址。

其最后生成的页面片url地址为：`urlRoot` + `src` .

即如上面那个例子，生成的最终url地址为：`https://www.paipai.com/test/t2/mod_hdft.css`


#### timestampType
Type: `String`
Default value: `'md5'`

可选的值有 `md5` || `time`

这里是创建时间戳的类型，提供md5 和 time 2种方式进行创建。

这里推荐用`md5`主要是因为，创建的页面片里可能会包含多个script，但是有些script可能并没有修改内容。
如果是用`time`方式，则全部script标签都使用新的时间戳，这样的话，并没有很好的利用浏览器的缓存。


#### timestampFormat
Type: `String`
Default value: `'yymmddhMMss'`

如果`timestampType`使用`time`的方式创建时间戳。那可以设置`time`时间戳的日期格式


### Usage Examples

```js
grunt.initConfig({
    timestamp_file: {
        //这里是整个页面片的公共设置部分
        options: {
          urlRoot:'https://www.paipai.com/'
        },
        script:{
            //如果有单任务特殊的设置可以在这里进行全局覆盖
            options: {
                //attr可以指定创建在script 或 link 标签上的属性
                attr:{
                    charset : "utf-8"
                }
            },
            //源路径
            src:'test/t2/*.js',
            //将页面片生成到的目标文件路径
            dest:'tmp/custom_options.html'
        },
        css:{
          src:'test/t2/*.css',
          dest:'tmp/custom_options2.html'
        }
    }
});
```

这里的`src`、`dest` 等设置方式可以参考: http://gruntjs.com/configuring-tasks

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

1. 页面片创建
