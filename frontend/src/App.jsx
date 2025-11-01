function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-sm bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#90CAF9] mb-6 text-center">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[#E0E0E0] font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#B0BEC5] rounded bg-[#121212] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
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
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#B0BEC5] rounded bg-[#121212] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
            />
          </div>

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
};

export default App
