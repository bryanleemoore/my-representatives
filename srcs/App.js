import logo from './logo.svg';
import './App.css';
import Startup from './components/Startup';
import Representatives from './components/Representatives';
import backIcon from './images/Back-Icon.png'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() 
{
  const [constituent, setConstituent] = useState(null);

  <div className="nav-bar">
  <button className = 'back-button'><img className = 'back-button-image' src={backIcon} alt="my image" onClick={() => setConstituent(null)} /></button>  
  </div>
  return (
    <div className="App">
      {constituent ?   
        <div className="nav-bar">
          <div className = "back-button-column"><button className = 'back-button'><img className = 'back-button-image' src={backIcon} alt="my image" onClick={() => setConstituent(null)} /></button>  
        </div></div> 
      : ''}
      {console.log(constituent)}
      {constituent ?  <Representatives constituent={constituent} setConstituent = {setConstituent}></Representatives>: <Startup setConstituent = {setConstituent}></Startup>}
    </div>
  );
}

export default App;
