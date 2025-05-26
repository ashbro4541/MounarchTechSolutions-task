import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AllProduct = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get('https://fakestoreapi.com/products');
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row">
        {data.map(product => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top p-4" alt={product.title} style={{ height: '250px', objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>

              <NavLink  to={`/product/${product.id}`} className="btn btn-primary mt-auto">view product</NavLink >

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
