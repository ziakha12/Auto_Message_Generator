import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.urlencoded({limit:'20kb', extended : true}))
app.use(express.json({limit:'20kb'}))
app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(cookieParser())

app.use('/', (req, res)=>{
    res.send('server is working and api is running')
})


export {app}