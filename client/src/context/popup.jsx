import { createContext, useState, useContext } from 'react';

const popContext = createContext();

const PopProvider = ({ children }) => {
  const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [forgot, setForgot] = useState(false);
  return (
    <popContext.Provider value={[signup, setSignup]}>
      {children}
    </popContext.Provider>
  );
}


// Custom hook

const usePop = () => useContext(popContext);

export { PopProvider, usePop };
