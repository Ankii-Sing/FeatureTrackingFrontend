import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/welcome';
import Feature from './components/Feature';
import AddFeature from './components/AddFeature';
import FeatureStatus from './components/FeatureStatus';


function App() {

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path = "/login" element = {<Login/>} />
      <Route path="/register" element ={<Register/>} />
      <Route path="/" element ={<Welcome/>} />
      <Route path="/Feature" element= {<Feature/>} />
      <Route path="/AddFeature" element= {<AddFeature/>} />
      <Route path="/FeatureStatus" element= {<FeatureStatus/>} />
    </Routes>
    </BrowserRouter>

  )

}

export default App
