// 用于在每次构建时生成版本号，版本号是时间戳
import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'
const publishVersion = (args: any = {}): Plugin => {
  console.log('🚀 ~ publishVersion ~ args:', args)
  return {
    name: 'vite-plugin-publish-version',
    apply: 'build',
    // enforce: 'pre',
    transformIndexHtml: (html: string) => {
      // console.log('🚀 ~ publishVersion ~ html:', html)
      const versionJsonPath = path.resolve(__dirname, '../dist/version.json')
      const version = new Date().getTime()
      fs.writeFile(versionJsonPath, JSON.stringify({ version }), (err) => {
        if (err) {
          console.log('🚀 ~ publishVersion ~ err:', err)
        }
      })

      const reg = /\s*<div\s+id="infoeyes-online-version"\s+style="display:\s*none">\s*<\/div>\s*/

      return html.replace(reg, `<div id="infoeyes-online-version" style="display: none">${version}</div>`)
    }
  }
}

export default publishVersion
