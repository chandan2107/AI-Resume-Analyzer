import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../interview/components/Loader'
import { Info, Eye, EyeOff } from 'lucide-react'

const DEMO_EMAIL = 'demo@gmail.com'
const DEMO_PASSWORD = '1234'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const [ error, setError ] = useState("")
    const [ errors, setErrors ] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address."
        }
        if (!password) {
            newErrors.password = "Password is required."
        } else if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters."
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (!validate()) return
        const result = await handleLogin({ email, password })
        if (result && result.success) {
            navigate('/')
        } else {
            setError(result?.error || "Login failed. Please check your credentials.")
        }
    }

    const fillDemo = () => {
        setEmail(DEMO_EMAIL)
        setPassword(DEMO_PASSWORD)
        setErrors({})
        setError("")
    }

    if (loading) return <Loader />

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200">
            <div className="w-full max-w-md p-10 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
                        <span
                            onClick={fillDemo}
                            title="Click to fill demo details"
                            className="cursor-pointer hover:text-neutral-500 hover:opacity-80 transition-all duration-200 select-none active:scale-95 inline-block"
                        >
                            Welcome
                        </span>{" "}
                        Back
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        Sign in to continue to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

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
                        {errors.password && <p className="text-xs text-red-600 flex items-center gap-1"><Info size={12} />{errors.password}</p>}
                    </div>

                    {/* Server error */}
                    {error && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                            <Info size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-200"></div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                </div>

                <p className="text-sm text-center text-neutral-500 mt-6">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-black font-semibold hover:underline underline-offset-4 transition-all">
                        Create Account
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login