import React, { useState, useRef } from 'react'

import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'
import { LogOut, Upload } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()
    const [ fileName, setFileName ] = useState("")

    const navigate = useNavigate()
    const { handleLogout } = useAuth()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) return <Loader  />

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900 p-6">

            {/* Logout button */}
            <div className="flex justify-end max-w-7xl mx-auto mb-4">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-xl border border-gray-200 shadow-sm hover:text-gray-900 hover:border-gray-400 hover:shadow-md active:scale-95 transition-all text-red-500"
                >
                    <LogOut size={15} />
                    Logout
                </button>
            </div>

            {/* Header */}
            <header className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Create Your Custom <span className="text-gray-500">Interview Plan</span>
                </h1>
                <p className="text-gray-600 mt-3">
                    Let AI analyze job requirements and your profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">

                    {/* Left Panel – Job Description */}
                    <div className="flex-1 p-8">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Job Description</p>
                            <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded-md">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full h-100 p-4 rounded-xl bg-gray-50 text-sm border border-gray-200 focus:outline-none focus:border-gray-400 transition-all resize-none"
                            placeholder="Paste the job description here..."
                            maxLength={5000}
                        />
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px bg-gray-300" />

                    {/* Right Panel – Resume & Self Description */}
                    <div className="flex-1 bg-gray-50 p-8 space-y-6">

                        {/* Upload Resume */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Upload Resume</p>
                                <span className="text-xs px-2 py-1 rounded-md bg-white text-gray-700 border border-gray-300">Recommended</span>
                            </div>
                            <label
                                htmlFor="resume"
                                className="flex flex-col items-center justify-center rounded-xl p-6 cursor-pointer
                                bg-white border-2 border-dashed border-gray-300
                                hover:border-gray-500 hover:bg-gray-100 transition-all"
                            >
                                {fileName ? (
                                    <p className="font-medium text-gray-900">{fileName}</p>
                                ) : (
                                    <>
                                        <Upload size={22} />
                                        <p className="font-medium text-gray-700">Click to upload or drag & drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF or DOCX (Max 5MB)</p>
                                    </>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files[ 0 ]
                                        if (file) setFileName(file.name)
                                    }}
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-xs text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        {/* Self Description */}
                        <div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Self Description</p>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="w-full h-28 p-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-gray-400 text-sm transition-all resize-none"
                                placeholder="Describe your experience, skills, and background..."
                            />
                        </div>

                        {/* Info Note */}
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                            <div className="flex-shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">i</div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Please provide either your <span className="font-medium text-gray-900">Resume</span> or <span className="font-medium text-gray-900">Self Description</span> to proceed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
                    <button
                        onClick={handleGenerateReport}
                        className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-medium shadow-sm hover:shadow-md hover:bg-black active:scale-95 transition-all w-1/2"
                    >
                        Generate Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className="max-w-7xl mx-auto mt-10">
                    <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Recent Reports</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {reports.map((report) => (
                            <li
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className="p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {report.title || "Untitled Position"}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm mt-2 font-medium text-gray-700">
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    )
}

export default Home