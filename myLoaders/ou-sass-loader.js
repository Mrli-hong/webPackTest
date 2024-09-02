const sass = require('sass');


module.exports = function (source) {
    const callback = this.async();
    // 使用render函数进行解析scss代码
    sass.compileAsync(this.resourcePath, { data: source }).then(res => {
        callback(null, res.css);
    })

}
