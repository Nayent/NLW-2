const proffys = [
    {name: "Diego Fernandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "9182-1096", 
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Quimica", 
    cost: "20,00", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220]}
]

const subjects = [
    "Biologia",
    "Artes",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

const express = require("express")
const server = express()
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

function getSubject(subject){
    return subjects[subject - 1]
}

server.use(express.static("public"))

.get("/", (req, res) => {
    return res.render("index.html")
})
.get("/study", (req, res) => {
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
})
.get("/give-class", (req, res) => {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty){

        data.subject = getSubject(data.subject)

        proffys.push(data)
        return res.redirect("/study")
    }

    return res.render("give-class.html", {subjects, weekdays})
})
.listen(5500)