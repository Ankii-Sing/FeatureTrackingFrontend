// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from '../screens/publicScreens/login';
// import Register from '../screens/publicScreens/register';
// import Feature from '../screens/privateScreens/featureScreen';
// import AddFeature from '../screens/privateScreens/addFeature';
// import FeatureStatus from '../screens/privateScreens/FeatureStatus';
// import UpdateFeatureScreen from '../screens/privateScreens/updateFeatureScreen';
// import PrivateRoute from '../screens/privateScreens/PrivateRoutes';




// function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
    
//         {/* <Route path="/" element={<Welcome />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

        
//         <Route element={<PrivateRoute />}>
//           <Route path="/feature" element={<Feature />} />
//           <Route path="/addFeature" element={<AddFeature />} />
//           <Route path="/featureStatus" element={<FeatureStatus />} />
//           <Route path="/UpdateFeatureScreen" element={<UpdateFeatureScreen />} />
//         </Route>
        
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRouter;



import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "../screens/privateScreens/PrivateRoutes";

// Lazy-loaded components
const Login = lazy(() => import("../screens/publicScreens/login"));
const Register = lazy(() => import("../screens/publicScreens/register"));
const Feature = lazy(() => import("../screens/privateScreens/featureScreen"));
const AddFeature = lazy(() => import("../screens/privateScreens/addFeature"));
const FeatureStatus = lazy(() => import("../screens/privateScreens/FeatureStatus"));
const UpdateFeatureScreen = lazy(() => import("../screens/privateScreens/updateFeatureScreen"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes (Require Authentication) */}
          <Route element={<PrivateRoute />}>
            <Route path="/feature" element={<Feature />} />
            <Route path="/addFeature" element={<AddFeature />} />
            <Route path="/featureStatus" element={<FeatureStatus />} />
            <Route path="/UpdateFeatureScreen" element={<UpdateFeatureScreen />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;

