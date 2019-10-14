### 一、文件目录
* img 是项目依赖的静态资源文件
* import文件夹里面是模板文件
  * import/css.html css文件
  * import/footer.html 顾名思义，公共的footer组件
  * import/header.html 公共的header组件
  * import/import-example.html 相当于入口文件，各个组件的引入是在这个文件里面，通过link ref="import"的方式引入
* import-example.html（经过执行node import生成的文件），经过替换后生成的最终文件
* import.js node的执行文件
### 二、使用方法
直接执行node import，然后就会生成import-example.html，这个就是我们需要的静态页面，当修改该页面依赖的import/内的文件后，import-example.html文件也会自动改变