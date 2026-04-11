import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import Loader from '../components/Loader'
import { Code, MessageSquare, Send, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <Code size={16} /> },
    { id: 'behavioral', label: 'Behavioral Questions', icon: <MessageSquare size={16} /> },
    { id: 'roadmap', label: 'Road Map', icon: <Send size={16} /> },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index, isOpen, onToggle }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ">
        <div
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors select-none"
            onClick={onToggle}
        >
            <span className="flex-shrink-0 w-6 h-6 text-xs bg-gray-900 text-white rounded-full flex items-center justify-center font-medium mr-4">{index + 1}</span>
            <p className="flex-1 min-w-0 text-gray-900 font-medium break-words">{item.question}</p>
            {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {isOpen && (
            <div className="px-4 pb-4 space-y-4 max-h-48 overflow-y-auto overflow-x-hidden border-t border-gray-100 scrollbar-hide">
                <div className="space-y-2 pt-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Intention</span>
                    <p className="text-gray-700 text-sm break-words">{item.intention}</p>
                </div>
                <div className="space-y-2">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Model Answer</span>
                    <p className="text-gray-700 text-sm break-words">{item.answer}</p>
                </div>
            </div>
        )}
    </div>
)

const RoadMapDay = ({ day, index }) => (
    <div className="bg-gray-50 p-6 rounded-lg">
        <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">Day {index + 1}</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-2">{day.focus}</h3>
        </div>
        <ul className="space-y-2">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const [ openIndex, setOpenIndex ] = useState(null)
    const { report, getReportById, loading } = useInterview()
    const navigate = useNavigate()
    const { interviewId } = useParams()

    const handleTabChange = (id) => {
        setActiveNav(id)
        setOpenIndex(null)
    }

    const handleToggle = (i) => setOpenIndex(prev => prev === i ? null : i)

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) return <Loader />

    const scoreColor =
        report.matchScore >= 80 ? 'border-green-500 bg-green-50' :
            report.matchScore >= 60 ? 'border-yellow-500 bg-yellow-50' : 'border-red-500 bg-red-50'


    return (
        <div className="h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900 p-3 flex flex-col">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-1 min-h-0">

                {/* ── Left Nav ── */}
                <nav className="w-64 bg-gray-50 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center  mb-7 cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft size={16} />
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors w-full ${activeNav === item.id ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => handleTabChange(item.id)}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="w-px bg-gray-300" />

                {/* ── Center Content ── */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-8 flex flex-col flex-1 min-h-0">
                    {activeNav === 'technical' && (
                        <section className="flex flex-col flex-1 min-h-0">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Technical Questions</h2>
                                <span className="text-sm text-gray-500">{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 scrollbar-hide">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} isOpen={openIndex === i} onToggle={() => handleToggle(i)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className="flex flex-col flex-1 min-h-0">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Behavioral Questions</h2>
                                <span className="text-sm text-gray-500">{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 scrollbar-hide">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} isOpen={openIndex === i} onToggle={() => handleToggle(i)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className="flex flex-col flex-1 min-h-0">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Preparation Road Map</h2>
                                <span className="text-sm text-gray-500">{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto space-y-6 scrollbar-hide">
                                {report.preparationPlan.map((day, i) => (
                                    <RoadMapDay key={day.day} day={day} index={i} />
                                ))}
                            </div>
                        </section>
                    )}
                    </div>
                </main>


                <div className="w-px bg-gray-300" />

                {/* ── Right Sidebar ── */}
                <aside className="w-80 bg-gray-50 p-6 space-y-6">

                    {/* Match Score */}
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600 mb-4">Match Score</p>
                        <div className={`w-24 h-24 mx-auto rounded-full border-8 flex items-center justify-center ${scoreColor}`}>
                            <span className="text-2xl font-bold text-gray-900">{report.matchScore}</span>
                            <span className="text-lg text-gray-600">%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Strong match for this role</p>
                    </div>

                    <div className="border-t border-gray-300" />

                    {/* Skill Gaps */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-4">Skill Gaps</p>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`px-3 py-1 text-xs font-medium rounded-full ${gap.severity === 'high' ? 'bg-red-100 text-red-800' : gap.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview


