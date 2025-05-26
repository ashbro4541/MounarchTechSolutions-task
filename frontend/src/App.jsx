import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import AllProduct from './ALLProduct';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllProduct />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
                <Route path='/Cart' element={<Cart/>} />



      </Routes>
    </Router>
  );
};

export default App;
