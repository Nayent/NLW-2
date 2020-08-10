const {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
} = require('./utils/format')

const express = require("express")
const server = express()
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.static("public")).use(express.urlencoded({extended: true}))

.get("/", (req, res) => {
    return res.render("index.html")
})
.get("/study", async (req, res) => {

    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffys_id = proffys_id)
        WHERE EXISTS(
            SELECT class_scedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinuPtes}
            AND class_schedule.tome_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subjects)
        })

        
    } catch (error) {
        console.log(error)
        
    }

})
.get("/give-class", (req, res) => {
    return res.render("give-class.html", {subjects, weekdays})
})
.post("/save-class", async (req, res) => {
    
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValue = req.body.weekdays.map((weekdays, index) => {
        return {
            weekdays,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValue})
        
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study")
    } catch (error) {
        
    }  
    
    })
.listen(5500)