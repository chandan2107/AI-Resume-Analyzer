require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

// Only listen on a port during local development
// Vercel handles routing via the exported app
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}

module.exports = app