import { useEffect, useState } from "react";
import Bottle from "../bottle/Bottle";
import "./Bottles.css";
import {
  addToLocalStorage,
  getStoredCart,
  removeFromLocalStorage,
} from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  // Load data from json-file
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  // Load cart form localStorage
  useEffect(() => {
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      const savedCart = [];
      for (const id of storedCart) {
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLocalStorage(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    // visual cart remove
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    // remove from ls
    removeFromLocalStorage(id);
  };

  return (
    <div>
      <h2>Bottles Available : {bottles.length}</h2>
      <Cart handleRemoveFromCart={handleRemoveFromCart} cart={cart}></Cart>
      <div className="bottles-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            handleAddToCart={handleAddToCart}
            bottle={bottle}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
