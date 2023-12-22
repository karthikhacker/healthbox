import './App.css'
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from './pages/UpdateProfile';
import Reports from './pages/Reports';
import { useEffect } from 'react';
import { logoutUser } from './features/authSlice';

function App() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token;
    token = localStorage.getItem('user-token');
    if (token) {
      const current_date = new Date()
      const decodedToken = jwtDecode(token);
      if (decodedToken?.exp * 1000 < current_date.getTime()) {
        dispatch(logoutUser())
        navigate('/login');
      }
    }
  }, [])
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
      <Routes>
        <Route path="/profile" element={user !== null ? <Profile /> : <Navigate to="/" />} />
        <Route path="/reports" element={user !== null ? <Reports /> : <Navigate to="/" />} />
        <Route path="/update/profile" element={user !== null ? <UpdateProfile /> : <Navigate to="/login" />} />
        <Route path="/" element={user === null ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/signup" element={user === null ? <Signup /> : <Navigate to="/profile" />} />
        <Route path="/verify/otp" element={user === null ? <VerifyOtp /> : <Navigate to="/profile" />} />
      </Routes>
    </div>
  )
}

export default App
