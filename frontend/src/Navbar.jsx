import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex">
        <NavLink className="navbar-brand" to="/">MyStore</NavLink>
        

        <div className=" " id="">
          <ol className="navbar-nav  ">
            <li className="nav-item  ">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/AllProduct">Products</NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
          </ol>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
