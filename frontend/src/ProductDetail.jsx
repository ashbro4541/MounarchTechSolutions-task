import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("error while geting data", err);
      }
    };
    getData();
  }, [id]);

const addToCart = async (item) => {
  // Transform the item to match backend field names
  const payload = {
    product_id: item.id,    // map 'id' to 'product_id'
    title: item.title,
    price: item.price,
    image: item.image
  };

  try {
    await axios.post("http://127.0.0.1:3000/addtocart", payload);
    setFavorites([...favorites, payload]);
    setMsg(`${item.title} added to cart successfully`);
    setMsgType("success");
  } catch (err) {
    setMsg("product is ...");
    setMsgType("danger");
    console.log("cart error", err);
  }
};



  if (!product) {
    return <div className="text-center mt-5">Loding product detals...</div>;
  }

  return (
    <>
      {/* navbar kinda quick nav */}
    

      <div className="container my-5">
        <Link to="/allproduct" className="btn btn-outline-secondary mb-3">⬅ Go Back</Link>

        {/* optional msg alert */}
        {msg && (
          <div className={`alert alert-${msgType} text-center`} role="alert">
            {msg}
          </div>
        )}

        <div className="row align-items-center">
          <div className="col-md-5 mb-4 text-center">
            <img src={product.image} className="img-fluid border p-3 rounded" alt={product.title} style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </div>
          <div className="col-md-7">
            <h3 className="mb-2">{product.title}</h3>
            <p className="text-muted">{product.category}</p>
            <h4 className="text-success mb-3">${product.price}</h4>
            <p className="">{product.description}</p>
            <p>
              <span className="badge bg-success text-dark">⭐ {product.rating.rate}</span>
              <span className="ms-2 text-muted">({product.rating.count} reviews)</span>
            </p>
            <button onClick={() => addToCart(product)} className="btn btn-primary mt-2">
              Add to Cart 🛍
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ProductDetail;
