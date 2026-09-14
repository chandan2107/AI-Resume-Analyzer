import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../interview/components/Loader'
import { Info, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'

const passwordRules = [
    { id: 'length',    label: 'At least 6 characters',              test: (p) => p.length >= 6 },
    { id: 'uppercase', label: 'At least one uppercase letter (A–Z)', test: (p) => /[A-Z]/.test(p) },
    { id: 'lowercase', label: 'At least one lowercase letter (a–z)', test: (p) => /[a-z]/.test(p) },
    { id: 'number',    label: 'At least one number (0–9)',           test: (p) => /[0-9]/.test(p) },
]

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const [ passwordFocused, setPasswordFocused ] = useState(false)

    const [ errors, setErrors ] = useState({})
    const [ serverError, setServerError ] = useState("")
    const { loading, handleRegister } = useAuth()

    const validate = () => {
        const newErrors = {}
        if (!username.trim()) {
            newErrors.username = "Username is required."
        } else if (username.trim().length < 3) {
            newErrors.username = "Username must be at least 3 characters."
        }
        if (!email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address."
        }
        if (!password) {
            newErrors.password = "Password is required."
        } else {
            const failedRules = passwordRules.filter(r => !r.test(password))
            if (failedRules.length > 0) {
                newErrors.password = "Password does not meet all requirements."
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerError("")
        if (!validate()) return
        const result = await handleRegister({ username, email, password })
        if (result && result.success) {
            navigate("/")
        } else {
            setServerError(result?.error || "Registration failed. Please try again.")
        }
    }

    if (loading) return <Loader />

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200">
            <div className="w-full max-w-md p-10 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
                        Create Account
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        Sign up to get started
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {/* Username */}
                    <div className="space-y-1.5">
                        <label htmlFor="username" className="block text-sm font-medium text-black">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setErrors(p => ({ ...p, username: "" })) }}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className={`w-full px-4 py-3 border rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200 ${errors.username ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-neutral-200'}`}
                        />
                        {errors.username && <p className="text-xs text-red-600 flex items-center gap-1"><Info size={12} />{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 border rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200 ${errors.email ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-neutral-200'}`}
                        />
                        {errors.email && <p className="text-xs text-red-600 flex items-center gap-1"><Info size={12} />{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })) }}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 pr-11 border rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200 ${errors.password ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-neutral-200'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Password strength rules (show when focused or has content) */}
                        {(passwordFocused || password.length > 0) && (
                            <ul className="mt-2 space-y-1 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                                {passwordRules.map(rule => {
                                    const passed = rule.test(password)
                                    return (
                                        <li key={rule.id} className={`flex items-center gap-2 text-xs transition-colors ${passed ? 'text-green-600' : 'text-neutral-400'}`}>
                                            {passed
                                                ? <CheckCircle2 size={13} className="flex-shrink-0" />
                                                : <XCircle size={13} className="flex-shrink-0" />
                                            }
                                            {rule.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        {errors.password && !passwordFocused && (
                            <p className="text-xs text-red-600 flex items-center gap-1"><Info size={12} />{errors.password}</p>
                        )}
                    </div>

                    {/* Server error */}
                    {serverError && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                            <Info size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-700">{serverError}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-200"></div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                </div>

                <p className="text-sm text-center text-neutral-500 mt-6">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-black font-semibold hover:underline underline-offset-4 transition-all">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Register