// import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={ <ProtectedRoute><Chat chatType= {'gene'}  /></ProtectedRoute>} />
        <Route path='/chat-sales' element={ <ProtectedRoute><Chat chatType={'csv'} /></ProtectedRoute>} />
      </Routes>
           
    </div>
  );
}

export default App;
