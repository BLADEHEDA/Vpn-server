import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import serverRoutes from './routes/server.route.js'

const app = express()
const PORT = 5000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))

app.use('/servers',serverRoutes)

const uri = process.env.MONGODB_URL

mongoose.connect(uri)
  .then(() => {
    console.log('Connected! the mongoDb')
    app.listen(PORT, () =>
        console.log(`SERVER is running on ports: http://localhost:${PORT}`)
    )
})
  .catch((error)=>{
    console.log(error)
  })
