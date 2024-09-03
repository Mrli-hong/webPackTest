module.exports = class MyPlugin {
    apply(compiler) {
        // 生成资源到 output 目录之前
        compiler.hooks.emit.tap("MyPlugin", (compilation) => {
            let str = ''
            for (let filename in compilation.assets) {
                // 获取文件名称和文件大小
                str += `${filename} -> ${compilation.assets[filename]['size']() / 1000}KB\n`
            }

            // 新建fileSize.txt
            compilation.assets['fileSize.txt'] = {
                // 内容
                source: function () {
                    return str
                }
            }
        })
    }
}
