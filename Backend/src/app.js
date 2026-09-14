const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.VITE_FRONTEND_URL,
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


/* Global error handler — must be last, with 4 args */
app.use((err, req, res, next) => {
    console.error("[ERROR]", err)
    const status = err.status || err.statusCode || 500
    res.status(status).json({
        message: err.message || "Internal server error"
    })
})



module.exports = app