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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginUser />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="/" element={<User />}>
          <Route index element={<HomePage />} />
          <Route path="post" element={<Post />} />
          <Route path=""/>
        </Route>
        <Route path="adminlogin" element={<LoginAdmin />} />
        <Route path="admin/" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="updateinfo" element={<UpdateInfo />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="users/details/:id" element={<DetailUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
