const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const { createFile } = require('../utils/utils_createFile.js')

const PLAN_JSON = path.resolve(__dirname, '../../../docs/public/json/plan.json')

function readPlan() {
  if (!fs.existsSync(PLAN_JSON)) {
    const initial = { data: [] }
    createFile(PLAN_JSON, JSON.stringify(initial))
    return initial
  }
  const raw = fs.readFileSync(PLAN_JSON, 'utf-8')
  return JSON.parse(raw)
}

module.exports = function (app) {
  app.post('/plan', bodyParser.json(), (req, res) => {
    const form = req.body

    try {
      const data = readPlan()
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id == form._id) {
          data.data[i].items = data.data[i].items.map((item) => {
            if (item.id == form.id) {
              return form
            }
            return item
          })
        }
      }

      createFile(PLAN_JSON, JSON.stringify(data))

      res.json({
        success: true,
      })
    } catch {
      res.json({
        success: false,
      })
    }
  })

  app.post('/plan/edit', bodyParser.json(), (req, res) => {
    const form = req.body

    try {
      const data = readPlan()
      let hasId = false
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id == form.id) {
          data.data[i] = form
          hasId = true
        }
      }

      if (!hasId) {
        data.data.unshift(form)
      }

      createFile(PLAN_JSON, JSON.stringify(data))

      res.json({
        success: true,
      })
    } catch {
      res.json({
        success: false,
      })
    }
  })
}
