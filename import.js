let fs = require('fs')
let src = 'import', // 依赖文件的文件夹
  filename = 'import-example.html' // 模板文件
var relyonFiles = [filename] // 依赖的所有文件

let fnImportExample = (src, filename) => {
  
  // 因为读取文件是异步操作，为了获取到import-example.html依赖的所有文件，因此使用promise
  const promise = new Promise((resolve, reject) => {
    fs.readFile(src + '/' + filename, {
      encoding: 'utf-8'
    }, (err, data) => {
      let dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, (getMatchedCSSRules, m1) => {
        relyonFiles.push(m1)
        return fs.readFileSync(src + '/' + m1, {
          encoding: 'utf-8'
        })
      })
      // img文件夹所对应的目录结构，因为css.html文件是在import文件夹内部，但是
      dataReplace = dataReplace.replace(/\.\.\//g, './')
      resolve(relyonFiles)
      fs.writeFile(filename, dataReplace, {
        encoding: 'utf-8'
      }, (err) => {
        if (err) throw err
        console.log(filename + '生成成功')
      })
    })
  })
  return promise
}

fnImportExample(src, filename).then((files) => {
  // 监控filename依赖的所有文件，当那些文件发生改变时，重新生成import-example.html文件
  files.forEach((file) => {
    fs.watch(src + '/' + file, (event) => {
      if (event == 'change') {
        console.log(src + '/' + file + '发生了改变，重新生成...' + filename)
        fnImportExample(src, filename)
      }
    })
  })
})
