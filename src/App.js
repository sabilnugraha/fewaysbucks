import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landingPages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link } from "react-router-dom";
import LandingPages from "./pages/landingPages";
import Profile from "./pages/profile";
import DetailProduct from "./pages/DetailProduct";
import AddProduct from "./pages/AddProduct";
import AddTopping from "./pages/AddTopping";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Test from "./pages/test";
import Testtopping from "./pages/testtopping";
import { Usercontext } from "./context/usercontext";
import { API, setAuthToken } from "./config/api";
import ProductAdmin from "./pages/ProductAdmin";
import UpdateProduct from "./pages/UpdateProductAdmin";
import ToppingList from "./pages/TopppingList";
import UpdateToppping from "./pages/UpdateTopping";
import DetailCoffe from "./pages/DetailCoffe";

function App() {
  const [state, dispatch] = useContext(Usercontext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false) {
      navigate("/");
    } else {
      if (state.user.status == "admin") {
        navigate("/admin");
        // history.push("/complain-admin");
      } else if (state.user.status == "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/addProduct" element={<Test />} />
      <Route path="/addTopping" element={<Testtopping />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productadmin" element={<ProductAdmin />} />
      <Route path="/toppings" element={<ToppingList />} />
      <Route path="/edit-product/:id" element={<UpdateProduct />} />
      <Route path="/edit-topping/:id" element={<UpdateToppping />} />
    </Routes>
  );
}

export default App;
