import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import loginRoutes from './routes/login.router.js'
import signUpRoutes from './routes/signUp.router.js'
import studentsRoutes from './routes/student.router.js'
import examRoutes from './routes/exam.router.js'
import enrollmentRoutes from './routes/enrollment.router.js'
import mongoose from 'mongoose';
import coursesRoutes from './routes/courses.router.js'
import lecturerCourseRoutes from './routes/lecturerCourse.router.js'
import StudentCoursesExamsRoutes  from './routes/StudentCoursesExams.router.js'
import LecturerCoursesExamsRoutes from './routes/lecturerCoursesExams.router.js'



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

app.use('/login',loginRoutes)
app.use('/users',signUpRoutes)
app.use('/students',studentsRoutes)  
app.use('/courses',coursesRoutes)
app.use('/exams',examRoutes)
app.use('/enrollments',enrollmentRoutes)
app.use('/lecturerCourse',lecturerCourseRoutes)
app.use('/examinations',StudentCoursesExamsRoutes) 
app.use('/setExams',LecturerCoursesExamsRoutes) 

const uri = process.env.MONGO_URL

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
