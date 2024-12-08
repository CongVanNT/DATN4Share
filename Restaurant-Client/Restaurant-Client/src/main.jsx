import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import CartProduct from "./pages/CartProduct.jsx";
import ProductDetail from "./pages/Product-detail.jsx";
import Blog from "./pages/Blog.jsx";
import ProfileUser from "./pages/ProfileUser.jsx";
import FavouritePage from "./pages/FavouritePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import ProductAdmin from "./component/admin/ProductAdmin.jsx";
import OrderAdmin from "./component/admin/OrderAdmin.jsx";
import PostAdmin from "./component/admin/PostAdmin.jsx";
import UserAdmin from "./component/admin/UserAdmin.jsx";
import CategoryAdmin from "./component/admin/CategoryAdmin.jsx";
import ChefAdmin from "./component/admin/ChefAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<CartProduct />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/favourite-page' element={<FavouritePage />} />
        <Route path='/profile-user' element={<ProfileUser />} />
        <Route path='/menu' element={<MenuPage />} />

        <Route path='/about' element={<About />} />
        <Route path='/admin' element={<Admin />}>
          <Route path='san-pham' element={<ProductAdmin />} />
          <Route path='don-hang' element={<OrderAdmin />} />
          <Route path='bai-viet' element={<PostAdmin />} />
          <Route path='khach-hang' element={<UserAdmin />} />
          <Route path='danh-muc' element={<CategoryAdmin />} />
          <Route path='dau-bep' element={<ChefAdmin />} />
        </Route>
      </Route>
    </Routes>
    <ToastContainer autoClose='2000' />
  </Router>
);
