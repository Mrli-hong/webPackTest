module.exports = {
    plugins: [
        // css兼容性处理
        require('autoprefixer')({
            overrideBrowserslist: ['last 2 versions', '>1%']
        }),
        // css压缩
        require('cssnano')
    ]
}