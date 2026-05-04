---
name: travel-poster-prompts
description: >-
  Builds structured JSON poster prompts (海报) for image and copy models from
  trip calendar fields—emphasis on scenicSpots and food, minimal flight/return
  trip panels; GTA V–style anime comic grid, center_panel, surrounding_panels,
  调色板. Default: reply with JSON only (no repo edits).
  Use when the user pastes or points to travel itinerary data, asks for 旅行海报
  提示词、生图文案、行程海报, or wants output matching this repo’s poster JSON
  shape. Edit travelCalendarData.ts only if the user explicitly asks to persist
  it in the project.
---

# 旅行行程 → 海报生图/文案提示词

## 交付方式（默认）

- **默认**：根据用户给出的行程字段（或仓库里某段 `travelCalendarActivities` 条目的内容），在**回复里**输出符合下文格式的 JSON，供复制到生图/文案工具。**不要**为此去修改项目里的 `.ts` / `.vue` 等文件。
- **例外**：仅当用户**明确要求**把海报写入仓库（例如「写进 `travelCalendarData.ts`」「落到代码里」）时，才编辑对应文件并追加 `海报` 等字段。

## 何时使用

用户需要根据行程数据（来自粘贴、`travelCalendarData.ts` 引用、或口头描述），输出**一套可复制进 Midjourney / DALL·E / 国内生图 / 长文案模型**的结构化提示词时，按本文模板生成。

## 输入字段映射（来自日历条目）

| 数据源 | 写入提示词的用途 |
|--------|------------------|
| `content` | 城市/国家主题；`title` 可写为《…边记：都市生活 – 第一卷》式标题 |
| `timestamp` | 季节、昼夜、雨季/酷暑等**氛围**（不必写成「去程/回程航班」故事） |
| `color` | 在 `调色板` 末条写「行程主题色意境」（可写十六进制，或只写语义） |
| `food` | **主力**：拆进多条 `surrounding_panels`，与门店/街景绑定；同类可合并为一格 |
| `scenicSpots` | **主力**：`center_panel` 远景叠层 + 多条分镜；每个重要点位尽量有画面 |
| `trafficNumber` | **从简**：默认不占分镜主力位；若写交通，**至多一笔**（单次抵达或单次离开择一），不写往返双线；更常见用法是把精力留给景点与吃 |

数据里有脏字段（如空字符串、错误年份）时：**不要在提示词里照搬错误信息**；可一句备注「若日历已修正日期则以日历为准」。

## 输出格式（必须）

在回复中**只输出**一个顶层 JSON 对象（可用 Markdown 代码块包裹），结构固定如下（键名沿用项目惯例：`title` / `art_style` / `center_panel` / `surrounding_panels` / `调色板`）。除非用户要求持久化到仓库，否则不要新建或修改项目文件。

```json
{
  "海报": [
    {
      "title": "《…边记：都市生活 – 第一卷》",
      "art_style": "动漫风格的数字海报，GTA V 风格的漫画网格，…（2～4 个短句：光影、地域气质、情绪）",
      "center_panel": "主体人物 + 身后展开的地标叠层（与行程景点一致）；少吃飞机/站台画面，除非用户点名要",
      "surrounding_panels": [
        "分镜一句一画面",
        "…"
      ],
      "调色板": [
        "5～8 个短小色名或光线名",
        "最后一项可为行程主题色点缀（与 #hex 呼应）"
      ]
    }
  ]
}
```

## 写作规则

1. **语种**：`title`、`surrounding_panels`、`调色板` 以**简体中文**为主；必要时景点/店名保留原文。
2. **重心**：**地点（`scenicSpots`）与美食（`food`）** 占 `surrounding_panels` 的绝大部分篇幅；**减少**舷窗、滑行道、值机厅、「去程一张回程一张」式往返航空叙事，以及重复写多条火车/航班。
3. **art_style**：固定锚点「动漫」「数字海报」「GTA V」「漫画网格」，再叠加该目的地气质（热带/霓虹/殖民遗产/海滨等），避免堆砌超过 ~80 字。
4. **center_panel**：一人称旅人视角或中性主角即可；地标名称必须与输入 `scenicSpots` 对齐，勿编造未出现的景点；避免把画面重心放在飞机上。
5. **surrounding_panels**：
   - **默认 6～8 条**：以 **街区/景点 + 餐桌摊位** 为主；若行程含 `trafficNumber`，**合计不超过 1 条**分镜触及交通即可（或完全省略）。
   - 同类饮食或邻近景点可合并（如多种榴莲一味概括、同一商圈一页带过）。
   - 用户明确要求 **6 格漫画** 时，压成 **6 条**，建议主轴：**地标与街巷 → 另一地标 → 饮食高光 → 夜市/河畔/公园 → 博物馆或宗教建筑 → 收尾夜景或市集**（不按「飞机去—飞机回」排期）。
6. **调色板**：具象（马路灰、汤底气、霓虹洋红）优于抽象形容词；可多从食物与室外光线取色。
7. **禁止**：虚构未在行程数据中出现的国家、城市、门店或航班；政治敏感与刻板侮辱性表述。

## 可选：英文模型附录

若用户要把同一结构交给只懂英文的模型，在 JSON 后追加一节 **English compact block**（非必须），用简短英文复述 `art_style` + `center_panel` + 分镜列表即可，不重复整份 JSON。

## 更多示例

见 [examples.md](examples.md)。
