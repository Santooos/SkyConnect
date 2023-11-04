
import './App.css';
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import { LandingPage } from './LandingPage';
import SignUp from './SignUp';
import SignIn from './SignIn';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
