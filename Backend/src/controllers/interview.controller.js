const pdfParse = require("pdf-parse/lib/pdf-parse.js")
const { generateInterviewReport } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res, next) {
    try {
        // Parse resume PDF if uploaded, otherwise fall back to empty string
        let resumeText = ""
        if (req.file && req.file.buffer) {
            // Temporarily silence pdf.js internal warnings (e.g. "Ignoring invalid character in hex string")
            const originalWarn = console.warn
            console.warn = () => {}
            try {
                const parsed = await pdfParse(Buffer.from(req.file.buffer))
                resumeText = parsed.text
            } catch (pdfErr) {
                console.error("PDF parsing failed, proceeding without resume text:", pdfErr.message)
            } finally {
                console.warn = originalWarn
            }
        }

        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res, next) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (err) {
        next(err)
    }
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res, next) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController }