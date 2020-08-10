const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    successPage
} = require('./pages')


//configurar numjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.urlencoded({ extended: true }))
    //configurar arquivos staticos
server.use(express.static("public"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .get('/success', successPage)
    .post('/save-classes', saveClasses)
    .listen(5500)