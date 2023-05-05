// title 文章标题
// date 创建日期
// top 是否置顶
// dir 是否需要目录
// dirTag 目录标题监听
// valine 是否需要评论系统
// valineId 评论系统自定义ID
// tag 标签列表
// summary 文章简介
// password 文章自定义密码
// content 文章内容
module.exports = `---
title: {{title}}
date: {{date}}
summary: {{summary}}
config: {
    show: true,
    top: {{top}},
    dir: {{dir}},
    dirTag: {{dirTag}},
    tag: {{tag}},
    valine: {{valine}},
    valineId: {{valineId}}
}
password: {{password}}
---

{{content}}
`;