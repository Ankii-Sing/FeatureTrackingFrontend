import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/publicScreens/login';
import Register from './screens/publicScreens/register';
import Welcome from './screens/publicScreens/welcomeScreen';
import Feature from './screens/privateScreens/featureScreen';
import AddFeature from './screens/privateScreens/addFeature';
import FeatureStatus from './screens/privateScreens/FeatureStatus';
import PrivateRoute from './screens/privateScreens/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */} // outlet is used for dynamically render child routes..
        <Route element={<PrivateRoute />}>
          <Route path="/feature" element={<Feature />} />
          <Route path="/addFeature" element={<AddFeature />} />
          <Route path="/featureStatus" element={<FeatureStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;