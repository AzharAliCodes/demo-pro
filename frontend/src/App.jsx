import { Routes, Route } from "react-router-dom"
import LoginFrom from '../src/components/LoginForm'
import Home from '../src/components/Home'
import AdminNavigation from '../src/components/AdminNavigation'
import ManagerNavigation from '../src/components/ManagerNavigation'


function App() {

  return (
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginFrom />}/>
      <Route path="/admin" element={<AdminNavigation />} />
      <Route path="/manager" element={<ManagerNavigation />} />


      <Route path="*" element={<h2>Page not found</h2>} />
  </Routes>
  );
};

export default App
