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



// routes

import userRoutes from './routes/user.routes.js'

app.use('/api/v1/user', userRoutes)


export {app}