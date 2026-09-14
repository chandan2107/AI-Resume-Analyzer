const mongoose = require("mongoose")
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")

async function seedDemoUser() {
    try {
        const demoEmail = "demo@gmail.com"
        const existingDemo = await userModel.findOne({ email: demoEmail })
        if (!existingDemo) {
            const hash = await bcrypt.hash("1234", 10)
            await userModel.create({
                username: "demo_user",
                email: demoEmail,
                password: hash
            })
            console.log("Demo user seeded successfully: demo@gmail.com / 1234")
        }
    } catch (err) {
        console.error("Error seeding demo user:", err.message)
    }
}

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
        await seedDemoUser()
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB