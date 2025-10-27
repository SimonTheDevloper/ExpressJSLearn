const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res,) => {
    console.log("Here")
    res.render('index', { text: 'World' })
})

app.listen(3000) //das sagt der Server läuft auf port 3000
