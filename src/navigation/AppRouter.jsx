import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadableComponent from '../utils/LoadableComponent';
import PrivateRoute from '../screens/privateScreens/PrivateRoutes';

// Lazy-loaded components
const Login = LoadableComponent(() => import('../screens/publicScreens/login'));
const Register = LoadableComponent(() => import('../screens/publicScreens/register'));
const Feature = LoadableComponent(() => import('../screens/privateScreens/featureScreen'));
const AddFeature = LoadableComponent(() => import('../screens/privateScreens/addFeature'));
const FeatureStatus = LoadableComponent(() => import('../screens/privateScreens/FeatureStatus'));
const UpdateFeatureScreen = LoadableComponent(() => import('../screens/privateScreens/updateFeatureScreen'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
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
