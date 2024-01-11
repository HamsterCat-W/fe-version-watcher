"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 用于在每次构建时生成版本号，版本号是时间戳
var fs_1 = require("fs");
var path_1 = require("path");
var publishVersion = function (args) {
    if (args === void 0) { args = {}; }
    console.log('🚀 ~ publishVersion ~ args:', args);
    return {
        name: 'vite-plugin-publish-version',
        apply: 'build',
        // enforce: 'pre',
        transformIndexHtml: function (html) {
            // console.log('🚀 ~ publishVersion ~ html:', html)
            var versionJsonPath = path_1.default.resolve(__dirname, '../dist/version.json');
            var version = new Date().getTime();
            fs_1.default.writeFile(versionJsonPath, JSON.stringify({ version: version }), function (err) {
                if (err) {
                    console.log('🚀 ~ publishVersion ~ err:', err);
                }
            });
            var reg = /\s*<div\s+id="infoeyes-online-version"\s+style="display:\s*none">\s*<\/div>\s*/;
            return html.replace(reg, "<div id=\"infoeyes-online-version\" style=\"display: none\">".concat(version, "</div>"));
        }
    };
};
exports.default = publishVersion;
