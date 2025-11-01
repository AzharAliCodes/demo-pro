import { Routes, Route } from "react-router-dom"
import LoginFrom from '../src/components/LoginForm'
import Home from '../src/components/Home'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<h2>page not found</h2>} />
    </Routes>
  );
};

export default App
