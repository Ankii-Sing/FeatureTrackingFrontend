import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "../screens/privateScreens/PrivateRoutes";

const Welcome = lazy(() => import("../screens/publicScreens/welcomeScreen"));
const Login = lazy(() => import("../screens/publicScreens/login"));
const Register = lazy(() => import("../screens/publicScreens/register"));
const Feature = lazy(() => import("../screens/privateScreens/featureScreen"));
const AddFeature = lazy(() => import("../screens/privateScreens/addFeature"));
const FeatureStatus = lazy(() => import("../screens/privateScreens/FeatureStatus"));
const UpdateFeatureScreen = lazy(() => import("../screens/privateScreens/updateFeatureScreen"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen text-teal-600 font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/feature" element={<Feature />} />
            <Route path="/addFeature" element={<AddFeature />} />
            <Route path="/featureStatus" element={<FeatureStatus />} />
            <Route path="/updateFeatureScreen" element={<UpdateFeatureScreen />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
