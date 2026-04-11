import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../interview/components/Loader'
import { Info } from 'lucide-react'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ error, setError ] = useState("")
    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const result = await handleRegister({username,email,password})
        if (result && result.success) {
            navigate("/")
        } else {
            setError(result?.error || "Registration failed. Please try again.")
        }
    }

    if(loading) return <Loader />

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

            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-black">
                        Username
                    </label>
                    <input
                        onChange={(e) => { setUsername(e.target.value) }}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                        Email
                    </label>
                    <input
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-black">
                        Password
                    </label>
                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white text-black placeholder-neutral-400 transition-all duration-200"
                    />
                </div>

                <button
                    className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20"
                >
                    Create Account
                </button>

                {error && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                        <Info size={16} className="text-red-700 mt-0.5"/>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}
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