
import './App.css';
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import { LandingPage } from './LandingPage';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Chatwindow from './Chatwindow';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/chatwindow' element={<Chatwindow/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
