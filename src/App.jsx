// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './screens/publicScreens/login';
// import Register from './screens/publicScreens/register';
// import Welcome from './screens/publicScreens/welcomeScreen';
// import Feature from './screens/privateScreens/featureScreen';
// import AddFeature from './screens/privateScreens/addFeature';
// import FeatureStatus from './screens/privateScreens/FeatureStatus';
// import PrivateRoute from './screens/privateScreens/PrivateRoutes';
// import UpdateFeatureScreen from './screens/privateScreens/updateFeatureScreen';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
    
//         <Route path="/" element={<Welcome />} />
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

// export default App;

import React from "react";
import AppRouter from "./Navigation/AppRouter";

const App = () => {
  return <AppRouter />;
};

export default App