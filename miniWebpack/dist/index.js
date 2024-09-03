
(function (__webpack_modules__) {
  function __webpack_require__(moduleId) {
    function require(relPath) {
      console.log(relPath, moduleId, __webpack_modules__[moduleId])
      return __webpack_require__(__webpack_modules__[moduleId].deps[relPath])
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code)
    })(require, exports, __webpack_modules__[moduleId].code)
    return exports
  }
  __webpack_require__("D:\\Code\\webpackTest\\miniWebpack\\index.js")
})({ "D:\\Code\\webpackTest\\miniWebpack\\index.js": { "deps": { "./a.js": "D:\\Code\\webpackTest\\miniWebpack\\a.js" }, "code": "\"use strict\";\n\nvar _a = require(\"./a.js\");\nconsole.log(_a.msg);" }, "D:\\Code\\webpackTest\\miniWebpack\\a.js": { "deps": { "./b.js": "D:\\Code\\webpackTest\\miniWebpack\\b.js" }, "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.msg = void 0;\nvar _b = require(\"./b.js\");\nvar msg = exports.msg = \"Hello \".concat(_b.something);" }, "D:\\Code\\webpackTest\\miniWebpack\\b.js": { "deps": {}, "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.something = void 0;\nvar something = exports.something = 'World';" } })
