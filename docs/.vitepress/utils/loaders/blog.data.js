// article.data.js
import fs from 'node:fs'
import path from 'node:path'
import parseFrontmatter from 'gray-matter'

const excludedFiles = ['index.md']

export default {
  watch: ['../../../views/**/*.md'],
  load(watchedFiles) {
    const blogBase = 'views/blog'
    // 排除不必要文件
    const articleFiles = watchedFiles.filter((item) => {
      const filename = path.basename(item)
      return !excludedFiles.includes(filename)
    })
    // 解析文章 Frontmatter
    const articleList = articleFiles
      .map((item) => {
        const articleContent = fs.readFileSync(item, 'utf-8')
        const { data } = parseFrontmatter(articleContent)
        return {
          ...data,
          path: item
            .substring(item.lastIndexOf('/docs/') + 6)
            .replace(/\.md$/, ''),
        }
      })
      .filter((item) => {
        if (item.config && item.config.show)
          return item.config.show && item.path.includes(blogBase)
        return item.path.includes(blogBase)
      })

    const topArticle = articleList
      .filter((item) => {
        return item.config && item.config.top
      })
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    const otherArticle = articleList
      .filter((item) => {
        return !(item.config && item.config.top)
      })
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

    return [...topArticle, ...otherArticle]
  },
}
