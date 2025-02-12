import { createContext, useState } from "react";

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState([]);

  console.log("feature list data in from feature provider:", features);
  
  return (
    <FeatureContext.Provider value={{ features, setFeatures }}>
      {children}
    </FeatureContext.Provider>
  );
}

export default FeatureContext;