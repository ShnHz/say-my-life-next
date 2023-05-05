const express = require('express')

let app = express()

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
});


app.listen(3000, () => {
    console.log('本地服务启动成功,端口号3000')
    console.log('快速创建新文章：http://localhost:6200/views/tools/Create.html')
})

require('./create/createPageMethods.js')(app)
require('./plan/planMethods.js')(app)

require('./other/bigFileUploadAndResume/bigFileUploadAndResume.js')(app)