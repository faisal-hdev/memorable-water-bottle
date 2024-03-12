import "./Bottle.css";

const Bottle = ({ bottle, handleAddToCart }) => {
  const { img, name, price, ratings, seller } = bottle;

  return (
    <div className="bottle">
      <img src={img} alt="" />
      <h3>{name}</h3>
      <p>Price : {price}</p>
      <button onClick={() => handleAddToCart(bottle)}>Purchase</button>
    </div>
  );
};

export default Bottle;
