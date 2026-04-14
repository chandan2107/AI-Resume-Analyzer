const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // You can add multiple allowed origins here if needed
        const allowedOrigins = [
            process.env.FRONTEND_URL, 
            'http://localhost:5173',
            'https://ai-resume-analyzer-f2tp.vercel.app'
        ];
        
        // Remove trailing slashes from allowed origins for safe comparison
        const cleanAllowed = allowedOrigins.map(url => url ? url.replace(/\/$/, '') : null);
        
        if (cleanAllowed.indexOf(origin) !== -1 || !process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS: ' + origin))
        }
    },
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app