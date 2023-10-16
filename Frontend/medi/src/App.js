


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';

import Login from './components/Login';
import Register from './components/Register';

import Menu from './components/Menu';
import Forgot from './components/Forgot';
import Reset from './components/Resetpassword';

function App() {
  return (
    <Router>
    <div className="App">
  
      <Routes>
        <Route path='/' element={<Menu/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/main' element={<Main />}> </Route>
        <Route path='/forgot' element={<Forgot />}></Route>
        <Route path='/reset-password' element={<Reset />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
