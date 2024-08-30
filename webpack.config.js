const path = require('path');
// 引入htmlWebpackPlugin
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 多入口多输出
    entry: { name: './src/index.js', index: './src/index2.js' },

    // 多入口单输出
    // entry: ['./src/index.js', './src/index2.js'],
    mode: 'development', // mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: "eval",
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     // loader 对象写法传递配置参数
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            // {
            //     test: /\.css$/,
            //     // loader 数组写法传递配置参数
            //     use: ['style-loader', 'css-loader']
            // }
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
            filename: 'aa.html',
            chunks: ["name"]
        })
        , new htmlWebpackPlugin({
            template: './index.html',
            filename: 'aa2.html',
            chunks: ["index"]
        })
    ]
};
