import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'

const app=express()
app.use(expressValidator())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.status(200).send('Whats up mann long time')
})
app.use(morgan('dev'))
export default app
