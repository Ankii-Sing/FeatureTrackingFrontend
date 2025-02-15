import { createContext, useState } from "react";
import { useEffect } from "react";

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState([]);

  console.log("feature list data in from feature provider:", features);
  useEffect(() => {
    const storedFeatures = sessionStorage.getItem("features");
    if (storedFeatures) {
      setFeatures(JSON.parse(storedFeatures));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("features", JSON.stringify(features));
  }, [features]);

  return (
    <FeatureContext.Provider value={{ features, setFeatures }}>
      {children}
    </FeatureContext.Provider>
  );
}

export default FeatureContext;