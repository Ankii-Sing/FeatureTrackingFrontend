import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './screens/publicScreens/login';
import Register from './screens/publicScreens/register';
import Welcome from './screens/publicScreens/welcomeScreen';
import Feature from './screens/privateScreens/featureScreen';
import AddFeature from './screens/privateScreens/addFeature';
import FeatureStatus from './screens/privateScreens/FeatureStatus';


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
