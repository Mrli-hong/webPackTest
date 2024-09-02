const path = require('path');
// 引入htmlWebpackPlugin
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    if (argv.mode === 'development' || !argv.mode) {
        return {
            entry: ['./src/testLoader.js'],
            mode: 'development', // mode: 'production',
            output: {
                path: path.resolve(__dirname, 'dist/testloader'),
                filename: 'src/[name]-[chunkhash:6].js',
                // 设置静态bundle文件的名称,限制为webpack5
                assetModuleFilename: 'assets/[name]-[hash:6][ext]'
            },
            resolveLoader: {
                // 添加loader查询路径
                modules: ['node_modules', './myLoaders']
            },
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: ['ou-style-loader', 'ou-css-loader', 'ou-sass-loader']
                    },

                ]
            },
            plugins: [
                new CleanWebpackPlugin({
                    // dry: true   // 打开可测试，不会真正执行删除动作
                    cleanOnceBeforeBuildPatterns: [
                        '**/*',  // 删除dist路径下所有文件
                        `!package.json`,  // 不删除dist/package.json文件
                    ],

                }),
                new htmlWebpackPlugin({
                    template: './index.html',
                    filename: 'index.html',
                })
            ]
        }
    };
}
