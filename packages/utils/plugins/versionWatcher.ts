// 用于在每次构建时生成版本号，版本号是时间戳
import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'
import * as cheerio from 'cheerio'

interface Options {
  domId: string
}

const publishVersion = (
  args: Options = {
    domId: 'infoeyes-online-version'
  }
): Plugin => {
  console.log('🚀 ~ publishVersion ~ args:', args)
  const { domId } = args
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

      const $ = cheerio.load(html)
      $('body').append(`<div id="${domId}" style="display: none">${version}</div>`)

      return $.html()
    }
  }
}

export default publishVersion
