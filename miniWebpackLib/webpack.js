const fs = require("fs");
const path = require("path");
// 解析成ast语法树
const parser = require("@babel/parser");
// 遍历ast语法树,可在遍历过程中设置监听函数，遍历到import语句自动执行
const traverse = require("@babel/traverse").default;
// 将ast语法树转成代码
const babel = require("@babel/core");

module.exports = class Webpack {
    /**
    *  构造函数，获取webpack配置
    *  @param {*} options
    */
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;  // 入口文件
        this.output = output;  // 导出配置
    }

    /**
    *  webpack运行函数
    */
    run() {
        // 解析模块
        this.parseModules(this.entry);
        // 解析模块
        this.depsGraph = this.parseModules(this.entry);
        // 打包
        this.bundle()
    }

    bundle() {
        const content = `
        (function (__webpack_modules__) {
          function __webpack_require__(moduleId) {
            function require(relPath) {
              return __webpack_require__(__webpack_modules__[moduleId].deps[relPath])
              }
              var exports = {};
              (function (require,exports,code) {
                eval(code)
              })(require,exports,__webpack_modules__[moduleId].code)
              return exports
            }
            __webpack_require__(${JSON.stringify(this.entry)})
        })(${JSON.stringify(this.depsGraph)})
      `;


        // 生成bundle文件
        !fs.existsSync(this.output.path) && fs.mkdirSync(this.output.path);
        const filePath = path.join(this.output.path, this.output.filename);
        fs.writeFileSync(filePath, content);
    }
    /**
     * 获取依赖
     *  @param {*} temp
     *  @param {*} module
    */
    getDeps(temp, { deps }) {
        // 遍历依赖
        Object.keys(deps).forEach(key => {
            if (temp.some(i => i.file === deps[key])) return;
            // 获取依赖模块代码
            const child = this.getModuleInfo(deps[key]);
            temp.push(child);
            // 递归遍历
            this.getDeps(temp, child);
        })

    }
    /**
    *  模块解析
    *  @param {*} file
    */
    parseModules(file) {
        // 分析模块
        const entry = this.getModuleInfo(file);
        const temp = [entry];
        // 递归遍历，获取引入模块代码
        this.getDeps(temp, entry)
        // 将temp转成对象
        const depsGraph = {};
        temp.forEach(moduleInfo => {
            depsGraph[moduleInfo.file] = {
                deps: moduleInfo.deps,
                code: moduleInfo.code
            }
        })

        return depsGraph;
    }

    /**
    *  分析模块
    *  @param {*} file
    *  @returns Object
    */
    getModuleInfo(file) {
        const content = fs.readFileSync(file, 'utf-8');
        const ast = parser.parse(content, {
            // 解析es模块
            sourceType: 'module',
        });
        // 依赖收集
        const deps = {};
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                const dirname = path.dirname(file);
                // 引入文件路径
                const absPath = path.join(dirname, node.source.value);
                deps[node.source.value] = absPath;
            }
        });
        const { code } = babel.transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
        return {
            file,
            deps,
            code
        }
    }

}
