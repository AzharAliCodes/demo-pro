import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/api'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const res = await API.post("/login", {email, password})
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("user_id", res.data.user_id)

            if (res.data.role === "admin") navigate("/admin")
            else if (res.data.role === "manager") navigate("/login/admin")
            else navigate("/login/admin")
        } catch (err){
            setError(err.response?.data?.error || "Login Failed")
        }
    }


    return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-sm bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#90CAF9] mb-6 text-center">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-[#E0E0E0] font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full px-4 py-2 border border-[#B0BEC5] rounded bg-[#121212] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[#E0E0E0] font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-4 py-2 border border-[#B0BEC5] rounded bg-[#121212] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
              required
            />
          </div>

          {error && <p className='text-red-500'>{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#90CAF9] text-[#121212] py-2 rounded hover:bg-[#64B5F6] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm