---
title: 我搭建了一套自动化技术博客采集系统
date: 2026/04/26 23:30:00
summary: 分享我如何从零搭建一套自动化技术博客采集系统，实现每日自动采集、智能筛选、微信推送、一键发布到个人博客的完整工作流。
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["自动化", "Python", "博客", "工具"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn)

作为一个热爱技术但时间有限的开发者，我一直想找到一种高效的方式来积累和分享优质的技术文章。经过一段时间的折腾，我终于搭建了一套完整的自动化博客采集系统。这篇文章记录了整个实现过程和踩过的坑。

## 为什么需要这套系统

### 痛点分析

作为一个前端工程师转型管理，我的日常是这样的：

- **信息过载**：每天刷掘金、知乎、GitHub，看到好文章收藏后就忘了
- **时间碎片化**：想写博客总结，但整理素材就要花大量时间
- **重复劳动**：手动复制粘贴、调整格式、上传图片，效率太低
- **知识管理混乱**：收藏的文章散落在各个平台，没有统一归档

### 目标设定

我希望实现的工作流：

1. **自动采集**：每天定时从多个平台抓取优质文章
2. **智能筛选**：根据我的技术栈（AI > 前端 > 后端）自动评分排序
3. **主动推送**：通过微信推送候选文章，不用主动刷
4. **一键发布**：选中文章后自动爬取、格式化、保存、提交Git
5. **图片托管**：自动上传图片到CDN，避免外链失效

## 系统架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                    定时任务调度 (Cron)                        │
│                    每日北京时间 18:00                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    文章采集器 (Collector)                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │  掘金   │ │  V2EX   │ │ GitHub  │ │ 博客园  │ │  知乎   │ │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    智能筛选器 (Filter)                        │
│  • AI相关 (+25分): 大模型、LLM、ChatGPT、Claude、机器学习      │
│  • 前端相关 (+15分): Vue、React、JavaScript、工程化           │
│  • 后端相关 (+10分): Java、Go、Python、数据库                  │
│  • 排除内容: 招聘、广告、推广、商务合作                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    微信推送通知                               │
│  候选文章列表推送到微信，等待用户选择                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    文章处理器 (Processor)                     │
│  • 爬取完整文章内容                                          │
│  • HTML转Markdown格式                                        │
│  • 提取图片并标记占位符                                       │
│  • 自动分类保存到对应目录                                     │
│  • Git add → commit → push                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    图片上传器 (Uploader)                      │
│  • 下载占位符图片                                            │
│  • 上传到七牛云CDN                                          │
│  • 替换文章中的图片地址                                       │
│  • Git commit → push                                        │
└─────────────────────────────────────────────────────────────┘
```

## 核心模块实现

### 1. 文章采集器 (collector.py)

采集器负责从多个平台抓取文章元数据：

```python
class BlogCollector:
    def __init__(self):
        self.session = requests.Session()
        self.articles = []
    
    def fetch_juejin(self) -> List[Article]:
        """掘金热门文章"""
        # 调用掘金API获取推荐文章
        pass
    
    def fetch_v2ex(self) -> List[Article]:
        """V2EX技术节点"""
        # 爬取js/vue/react节点
        pass
    
    def fetch_github_trending(self) -> List[Article]:
        """GitHub Trending"""
        # 解析JavaScript/TypeScript热门仓库
        pass
    
    def fetch_zhihu(self) -> List[Article]:
        """知乎技术文章"""
        # 搜索AI/前端相关话题
        pass
```

**踩坑记录**：
- 掘金API有反爬机制，需要控制请求频率
- GitHub Trending页面改版频繁，需要适配新的DOM结构
- 知乎需要处理登录态，部分文章需要Cookie才能访问

### 2. 智能评分算法

评分算法是系统的核心，决定了推送文章的质量：

```python
def calculate_score(self, article: Article) -> int:
    score = 50  # 基础分
    
    # AI相关内容加分最高
    ai_keywords = ['ai', '大模型', 'llm', 'chatgpt', 'claude', 
                   '机器学习', '深度学习', 'copilot', 'cursor']
    for keyword in ai_keywords:
        if keyword in title_tags:
            score += 25
            break
    
    # 前端内容加分中等
    frontend_keywords = ['vue', 'react', 'javascript', '前端']
    for keyword in frontend_keywords:
        if keyword in title_tags:
            score += 15
            break
    
    # 平台权重
    platform_weights = {
        '知乎': 1.3,    # 知乎文章质量较高
        '掘金': 1.2,
        'V2EX': 1.1,
        'GitHub': 1.0,
    }
    score *= platform_weights.get(article.platform, 1.0)
    
    # 标题质量加分
    quality_keywords = ['实战', '原理', '深入', '源码', '最佳实践']
    if any(word in article.title for word in quality_keywords):
        score += 8
    
    return min(int(score), 100)
```

**设计思路**：
- 当前AI是技术热点，优先推送AI相关内容
- 前端是我的主业，保持技术敏感度
- 后端内容作为补充，拓宽技术视野
- 自动排除招聘、广告等低质量内容

### 3. 微信推送集成

使用Hermes的send_message工具实现微信推送：

```python
def generate_notification(articles: List[Article]) -> str:
    message = f"📚 技术博客每日精选 - {date_str}\n\n"
    
    for i, article in enumerate(articles[:10], 1):
        message += f"""{i}. 【{article.platform}】{article.title}
   作者：{article.author} | 推荐分：{article.score}
   链接：{article.url}
   摘要：{article.summary[:80]}...\n\n"""
    
    message += """💡 请回复文章编号（如：1,3,5）告诉我您想引入哪些文章
   或回复 "all" 引入全部
   或回复 "none" 跳过今日"""
    
    return message
```

**交互设计**：
- 每天18:00准时推送，养成阅读习惯
- 显示推荐分数，帮助快速判断文章质量
- 支持批量选择（1,3,5）或全选（all）

### 4. 文章处理器 (processor.py)

处理器负责将选中的文章转换为博客格式：

```python
class ArticleProcessor:
    def process_selected(self, selections: List[int]):
        for idx in selections:
            article = candidates[idx - 1]
            
            # 1. 爬取完整内容
            content = self.formatter.fetch_full_content(article)
            
            # 2. 转换为Markdown
            blog_content = self.formatter.format_to_blog(article, content)
            
            # 3. 自动分类
            category = self._determine_category(article)
            output_path = os.path.join(self.blog_dir, category, filename)
            
            # 4. 保存文件
            with open(output_path, 'w') as f:
                f.write(blog_content)
            
            # 5. Git提交并推送
            self.git_commit([output_path])
```

**自动分类规则**：
- Vue相关 → `docs/views/blog/vue/`
- React/JS → `docs/views/blog/js/`
- CSS相关 → `docs/views/blog/css/`
- AI相关 → `docs/views/blog/ai/`（新增）
- 算法 → `docs/views/blog/algorithm/`

### 5. 图片上传器 (uploader.py)

图片处理是博客迁移中最繁琐的环节，我实现了全自动处理：

```python
class QiniuUploader:
    def upload_image(self, image_url: str) -> str:
        # 1. 下载原图
        response = requests.get(image_url)
        image_data = response.content
        
        # 2. 七牛云认证
        q = Auth(self.config['access_key'], self.config['secret_key'])
        token = q.upload_token(self.config['bucket'])
        
        # 3. 上传
        ret, info = put_data(token, filename, image_data)
        
        # 4. 返回CDN地址
        return f"{self.config['domain']}/{filename}"
    
    def process_article_images(self, article_file: str):
        # 读取文章，替换占位符为实际URL
        with open(article_file, 'r') as f:
            content = f.read()
        
        for placeholder, new_url in image_mapping.items():
            content = content.replace(placeholder, new_url)
        
        with open(article_file, 'w') as f:
            f.write(content)
```

**优化点**：
- 图片文件名包含时间戳和随机串，避免冲突
- 支持WebP格式，减少体积
- 自动压缩，节省CDN流量

## 定时任务配置

使用Hermes的cronjob系统设置每日定时任务：

```python
# 任务配置
{
    "job_id": "blog-collector-18-00",
    "name": "技术博客每日采集",
    "schedule": "0 18 * * *",  # 每天18:00
    "repeat": "forever",
    "enabled_toolsets": ["terminal", "file"]
}
```

**为什么选择18:00**：
- 下班前推送，可以在通勤路上阅读
- 避开上午工作高峰期
- 给自己留出晚上处理的时间

## 实际使用效果

### 数据统计

运行一周后的数据：

- **采集文章数**：平均每天15-20篇
- **筛选通过率**：约40%（排除广告/低质量内容）
- **实际采纳率**：约30%（我选择引入的文章）
- **时间节省**：每天节省30-40分钟整理时间

### 典型工作流

**场景1：发现优质AI文章**

1. 18:05 收到微信推送，看到一篇Claude Code实战文章（推荐分92）
2. 回复 "4" 选中这篇文章
3. 系统自动爬取、转换、保存到 `blog/ai/` 目录
4. 图片自动上传到七牛云
5. Git自动提交并推送到dev分支
6. 我在VitePress中预览，微调格式后合并到main分支

**场景2：批量处理**

1. 某天特别忙，没看微信
2. 第二天回复 "all" 引入全部候选文章
3. 系统自动处理所有文章
4. 周末统一review和发布

## 踩坑与优化

### 问题1：GitHub Trending解析失败

**现象**：GitHub页面改版后，原来的CSS选择器失效

**解决**：使用更稳定的属性选择器，增加异常处理：

```python
# 旧代码（失效）
repo_list = soup.find_all('article', class_='Box-row')

# 新代码（更健壮）
repo_list = soup.select('article[data-testid="repo-list-item"]')
if not repo_list:
    repo_list = soup.find_all('article', class_='Box-row')
```

### 问题2：图片上传后文章未更新

**现象**：图片上传到七牛云成功，但文章中的占位符没有被替换

**原因**：正则表达式匹配问题，某些图片URL包含特殊字符

**解决**：使用更精确的字符串替换：

```python
# 使用原始URL作为key，避免编码问题
placeholder = f"PLACEHOLDER_IMAGE:{original_url}"
content = content.replace(placeholder, new_url)
```

### 问题3：定时任务时区问题

**现象**：任务没有按北京时间18:00执行

**解决**：在Hermes中明确指定时区：

```python
"schedule": "0 18 * * *",
"timezone": "Asia/Shanghai"
```

## 未来优化方向

### 短期计划

1. **增加更多平台**：SegmentFault、InfoQ、微信公众号（需要RSS）
2. **智能摘要**：使用AI生成文章摘要，替代平台提供的摘要
3. **标签自动补全**：基于内容自动提取关键词作为标签

### 长期规划

1. **阅读数据分析**：统计我实际阅读的文章类型，优化推荐算法
2. **自动生成周报**：基于采集的文章自动生成技术周报
3. **知识图谱**：构建技术知识点之间的关联关系

## 总结

这套自动化系统解决了我长期以来的信息焦虑问题。以前每天要花大量时间刷各种平台，现在只需要在微信里花2分钟选择文章，剩下的都交给系统自动处理。

**核心价值**：
- ✅ 节省时间：每天节省30-40分钟
- ✅ 提高质量：智能筛选避免低质量内容
- ✅ 统一归档：所有文章都在自己的博客中
- ✅ 便于回顾：建立个人知识库

如果你也有类似的需求，欢迎参考我的实现。代码已经开源在GitHub上，可以根据自己的技术栈进行调整。

---

**相关链接**：
- 博客源码：[github.com/ShnHz/say-my-life-next](https://github.com/ShnHz/say-my-life-next)
- 采集系统：`~/.hermes/blog_collector/`
- 定时任务：Hermes Cronjob `blog-collector-18-00`

**技术栈**：Python + BeautifulSoup + Hermes + VitePress + 七牛云CDN
