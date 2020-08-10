const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name: ,
        avatar: ,
        whatsapp: ,
        bio: ,
    }

    classValue = {
        subject: ,
        cost: ,
    }

    classScheduleValue = {
        weekday: ,
        time_from: ,
        time_to: 
    }

    await createProffy(db, {proffyValue, classValue, classScheduleValue})


    const selectedProffys = await db.all("SELECT * FROM proffys")

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffys_id = proffys_id)
        WHERE classes.proffys_id = 1;
    `)

    const selectClassesSchedules = await db.all(`
        SELECT class_scedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.tome_to > "520"
    `)


})