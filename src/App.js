import logo from './logo.svg';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const {currentUser} = useContext(AuthContext)

  console.log(currentUser)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
          <Route index element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;