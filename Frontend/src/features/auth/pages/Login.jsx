import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loader from '../../interview/components/Loader'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleLogin({email,password})
        if (result && result.success) {
            navigate('/')
        } else {
            alert(result?.error || "Login failed. Please check your credentials.")
        }
    }

    if(loading){
        return (<Loader/>)
    }


    return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-gray-200">
        <div className="w-full max-w-md p-10 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
                    Welcome Back
                </h1>
                <p className="text-neutral-500 text-sm">
                    Sign in to continue to your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                    </div>
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