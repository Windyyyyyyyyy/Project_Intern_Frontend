import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Statistics from "./pages/Admin/Statistics";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import Admin from "./component/Layout/Admin";
import DetailUser from "./pages/Admin/Users/UserDetails/detail.user";
import User from "./component/Layout/User";
import LoginAdmin from "./pages/Admin/Login";
import LoginUser from "./pages/User/Login";
import RegisterUser from "./pages/User/Register";
import Post from "./pages/User/Post";
import HomePage from "./pages/User/HomePage";
import UpdateInfo from "./pages/Admin/Dashboard/UpdateInfo";
import Service from "./pages/Admin/Service";
import Categories from "./pages/Admin/Categories";
import MyProducts from "./pages/User/MyProducts";
import MyProductsDetails from "./pages/User/MyProducts/MyProductsDetails";
import ProductDetailsUser from "./pages/User/HomePage/ProductDetails";
import MyInfo from "./pages/User/MyInfo";
import MyInfoDetails from "./pages/User/MyInfo/MyInfoDetails";
import Balances from "./pages/User/Balances";
import CategoryDetails from "./pages/Admin/Categories/CategoryDetails";
import ProductsDetailsAdmin from "./pages/Admin/Products/ProductsDetails";
import ServiceDetails from "./pages/Admin/Service/ServiceDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* User */}
        <Route path="login" element={<LoginUser />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="/" element={<User />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductDetailsUser />} />
          <Route path="post" element={<Post />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route
            path="my-products/details/:id"
            element={<MyProductsDetails />}
          />
          <Route path="my-info" element={<MyInfo />} />
          <Route path="my-info/update-info" element={<MyInfoDetails />} />
          <Route path="balances" element={<Balances />} />
        </Route>
        {/* Admin */}
        <Route path="adminlogin" element={<LoginAdmin />} />
        <Route path="admin/" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="update-info" element={<UpdateInfo />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="products" element={<Products />} />
          <Route
            path="products/details/:id"
            element={<ProductsDetailsAdmin />}
          />
          <Route path="users" element={<Users />} />
          <Route path="users/details/:id" element={<DetailUser />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/details/:id" element={<CategoryDetails />} />
          <Route path="service" element={<Service />} />
          <Route path="service/details/:id" element={<ServiceDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
