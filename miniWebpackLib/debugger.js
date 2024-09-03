const webpack = require('./webpack');
const options = require('../miniWebpack/webpack.config');
const path = require('path');

const configPath = path.dirname(require.resolve('../miniWebpack/webpack.config'))
options.entry = path.join(configPath, options.entry);
new webpack(options).run();
