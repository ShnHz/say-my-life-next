const bodyParser = require('body-parser')
const render = require('json-templater/string')

const { getPinYinFirstChar } = require('../utils/utils_pinyin')

const { createFile } = require('../utils/utils_createFile.js')

const Crawler = require('crawler')
const { JSDOM } = require('jsdom')
const replace = require('json-templater/string')

function removeDom(dom, removeDom) {
  const doms = dom.querySelectorAll(removeDom)
  for (let i = 0; i < doms.length; i++) {
    doms[i].parentNode.removeChild(doms[i])
  }
}

function replaceCode(dom) {
  const doms = dom.querySelectorAll('pre')
  for (let i = 0; i < doms.length; i++) {
    let classs = doms[i].querySelector('code').getAttribute('class')
    let theClass = classs.split(' ').filter((item) => item.includes('language'))
    let type = theClass.length > 0 ? theClass[0].match(/\-(.*)/)[1] : ''
    doms[i].before(`

\`\`\`${type}
${doms[i].textContent}
\`\`\`

`)
    doms[i].parentNode.removeChild(doms[i])
  }
}

function replaceTitle(dom) {
  let names = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  for (let i = 0, len = names.length; i < len; i++) {
    let doms = dom.querySelectorAll(names[i])
    let titleSymbol = new Array(i + 1)
      .fill(0)
      .map((item) => '#')
      .join('')
    for (let j = 0, len2 = doms.length; j < len2; j++) {
      doms[j].before(`

${titleSymbol} ${doms[j].textContent}

            `)

      doms[j].parentNode.removeChild(doms[j])
    }
  }
}

module.exports = function (app) {
  app.post('/create/page', bodyParser.json(), (req, res) => {
    let form = req.body
    let fileName = `${getPinYinFirstChar(form.title || '文章标题')}.md`

    async function createMd() {
      let outline = form.dirTag.map((item) => {
        return parseInt(item.replace(/[^0-9]/g, ''))
      })
      createFile(
        `./docs${form.link}/${fileName}`,
        render(require(`./PAGE_TEMPLATE.js`), {
          title: form.title || '文章标题',
          date: form.date,
          summary: form.summary,
          top: form.top,
          dir: form.dir,
          dirTag: JSON.stringify(form.dirTag),
          valine: form.valine,
          valineId: form.valineId,
          tag: JSON.stringify(form.tag),
          password:
            form.password && form.passwordCus
              ? form.passwordCus
              : form.password,
          content: '',
          outline: JSON.stringify([
            Math.min(...outline),
            Math.max(...outline),
          ]).replace(/\"/g, ''),
        })
      )
    }

    try {
      createMd()
    } catch {
      res.json({
        success: false,
        fileName: fileName,
      })
    }

    res.json({
      success: true,
      fileName: fileName,
    })
  })

  app.post('/forward/page', bodyParser.json(), (req, res) => {
    let form = req.body

    var c = new Crawler({
      maxConnections: 10,
      // This will be called for each crawled page
      callback: function (error, _res, done) {
        //爬好之后会执行这个回调函数
        if (error) {
          console.log(error)
        } else {
          //将爬好的数据赋值给juqery对象
          var $ = _res.$
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          // 爬取页面结构dom树
          const html = $('html').html()
          const dom = new JSDOM(html)
          const title = dom.window.document
            .querySelector('.article-title')
            .textContent.trim()
          const artic = dom.window.document.querySelector('.article-content')

          removeDom(artic, 'style')
          removeDom(artic, '.copy-code-btn')
          replaceCode(artic)
          replaceTitle(artic)

          let fileName = `${getPinYinFirstChar(title || '文章标题')}.md`

          async function createMd() {
            let outline = form.dirTag.map((item) => {
              return parseInt(item.replace(/[^0-9]/g, ''))
            })
            createFile(
              `./docs${form.link}/${fileName}`,
              render(require(`./PAGE_TEMPLATE.js`), {
                title: title || form.title || '文章标题',
                date: form.date,
                summary: form.summary,
                top: form.top,
                dir: form.dir,
                dirTag: JSON.stringify(form.dirTag),
                valine: form.valine,
                valineId: form.valineId,
                tag: JSON.stringify(form.tag),
                password:
                  form.password && form.passwordCus
                    ? form.passwordCus
                    : form.password,
                content: `###### 原文 [掘金](${form.articLink})

${artic.innerHTML}`,
                outline: JSON.stringify([
                  Math.min(...outline),
                  Math.max(...outline),
                ]).replace(/\"/g, ''),
              })
            )
          }

          try {
            createMd()

            res.json({
              success: true,
              fileName: fileName,
            })
          } catch {
            res.json({
              success: false,
              fileName: fileName,
            })
          }

          console.log('create file success.')
        }
        done()
      },
    })

    c.queue(form.articLink)
  })
}
