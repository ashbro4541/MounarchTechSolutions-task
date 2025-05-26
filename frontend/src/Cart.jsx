import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [msg, setMsg] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:3000/addtocart');
      setData(result.data);
     const total = result.data.reduce((acc, item) => acc + parseFloat(item.price), 0);
     
    setTotal(total);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMsg("Failed to load cart items");
      console.error("Error fetching cart data:", error);
    }
  };

const removeFromCart = async (id) => {
  try {
    if (window.confirm('Remove this item from cart?')) {
      await axios.delete(`http://localhost:3000/addtocart/${id}`);
      setData((prevData) => prevData.filter((product) => product.product_id !== id));  // use correct state
      alert('Removed successfully');
    }
  } catch (error) {
    console.error("Error removing item:", error);
    alert('Failed to remove item. Please try again.');
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading your cart...</div>;
  }


  return (
    <div className="container my-4 ">
      <div className="row">
        <div className="col-8">
      <h2 className="text-center  mb-4">Products in Cart</h2>

    

      <div className="row">
        {data.map(product => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.product_id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top p-4"
                alt={product.title}
                style={{ height: '250px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>

                <button
                  onClick={() => removeFromCart(product.product_id)}
                  className="btn btn-danger mt-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* {/* Total Price} */}
        <div className="col-4">
  <div className="card p-3 shadow-sm">
    <h3 className="text-center">Total Price</h3>
    <h1 className="text-center text-success">
      ${typeof total === 'number' ? total.toFixed(0) : '0.00'}
    </h1>
  </div>
</div>

    </div>
    </div>

  );
};

export default Cart;
