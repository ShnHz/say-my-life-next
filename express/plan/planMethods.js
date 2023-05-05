const bodyParser = require("body-parser");
const {
    createFile,
} = require('../utils/utils_createFile.js')

module.exports = function (app) {
    // post plan
    app.post('/plan', bodyParser.json(), (req, res) => {
        let form = req.body

        async function changeFile() {
            let data = require(`../../docs/.vuepress/public/json/plan.json`)
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].id == form._id) {
                    data.data[i].items = data.data[i].items.map(item => {
                        if (item.id == form.id) {
                            return form
                        }
                        return item
                    })
                }
            }

            createFile(`./docs/.vuepress/public/json/plan.json`, JSON.stringify(data))
        }

        try {
            changeFile();
            // console.log('change file success.')
            res.json({
                success: true,
            })
        } catch {
            res.json({
                success: false
            })
        }
    })

    // post plan/edit
    app.post('/plan/edit', bodyParser.json(), (req, res) => {
        let form = req.body

        async function changeFile() {
            let data = require(`../../docs/.vuepress/public/json/plan.json`)
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

            createFile(`./docs/.vuepress/public/json/plan.json`, JSON.stringify(data))
        }

        try {
            changeFile();
            // console.log('change file success.')
            res.json({
                success: true,
            })
        } catch {
            res.json({
                success: false
            })
        }
    })
}