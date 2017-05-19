# gulp-insert-string-into-tag
gulp插入字符串到指定标签之间的插件

## 安装
```
npm install gulp-insert-string-into-tag
```

## 用法
`gulpfile.js`
```javascript
var gulp = require('gulp');
var insertString = require('gulp-insert-string-into-tag');

gulp.task('default', function () {
    return gulp.src('index.html')
        .pipe(insertString.append({
            startTag:'<span>',
            endTag:'</span>',
            string:'append string'
        }))
        .pipe(insertString.prepend({
            startTag:'<!--start-->',
            endTag:'<!--end-->',
            string:'prepend string'
        }))
        .pipe(gulp.dest('dist'));
});
```
`index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

<span>
    This is String
</span>

<!--start-->
    This is other String
<!--end-->

</body>
</html>
```
### 输出结果
`dist/index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>


          <span>
          
    This is String

          append string
          </span>
          


          <!--start-->
          prepend string
          
    This is other String

          <!--end-->
          

</body>
</html>
```
## API
### Function 方法
- insertString.append(opts)  追加字符串到标签之间的最后面
- insertString.prepend(opts) 追加字符串到标签之间的最前面

### opts 选项
- startTag  开始标记,可以是任意字符串
- endTag    结束标记,可以是任意字符串
- string    待追加的字符串