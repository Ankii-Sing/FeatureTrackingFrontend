import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from '../screens/publicScreens/login';
// import Register from '../screens/publicScreens/register';
// import LoginContainer from "./containers/Login";

import Feature from '../screens/privateScreens/featureScreen';
import AddFeature from '../screens/privateScreens/addFeature';
import FeatureStatus from '../screens/privateScreens/FeatureStatus';
import UpdateFeatureScreen from '../screens/privateScreens/updateFeatureScreen';
import PrivateRoute from '../screens/privateScreens/PrivateRoutes';
import LoginContainer from '../screens/publicScreens/login';



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
    
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<Register />} />

        
        <Route element={<PrivateRoute />}>
          <Route path="/feature" element={<Feature />} />
          <Route path="/addFeature" element={<AddFeature />} />
          <Route path="/featureStatus" element={<FeatureStatus />} />
          <Route path="/UpdateFeatureScreen" element={<UpdateFeatureScreen />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;