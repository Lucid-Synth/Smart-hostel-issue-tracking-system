import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import StudentDashboard from "./pages/StudentDashboard"
import AddIssue from "./pages/AddIssues"
import Profile from "./pages/Profile"

function App() {

  return (
    <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/issues/add" element={<AddIssue />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  )
}

export default App