import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    let existingCartItem = localStorage.getItem("Cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}


// Custom hook

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
