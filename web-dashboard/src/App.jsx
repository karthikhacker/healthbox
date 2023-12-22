import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateRecord from './pages/CreateRecord';
import Footer from './components/Footer';
import Records from './pages/Records';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logoutUser } from './features/authSlice';
import LabProfile from './pages/LabProfile';

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const current_date = new Date()
      const decodedToken = jwtDecode(token);
      if (decodedToken?.exp * 1000 < current_date.getTime()) {
        dispatch(logoutUser())
        navigate('/');
      }
    }
  }, [])
  return (
    <div className='w-full'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
      <div>
        <div>
          <Routes>
            <Route path="signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route path="home" element={<Home />} />
                <Route path="create/record" element={<CreateRecord />} />
                <Route path="records" element={<Records />} />
                <Route path="lab/profile" element={<LabProfile />} />
              </Route>
            </Route>

          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App