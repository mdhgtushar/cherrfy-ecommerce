import {Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import AliExpressViewer from "./pages/AliExpressViewer";
import Dashboard from "./pages/Dashboard"; 
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import About from "./pages/About";
import ProductForm from "./pages/ProductForm";
import ProductListPage from "./pages/ProductListPage";
import AliExpressProductForm from "./pages/AliExpressProductForm";
import AdminList from "./features/auth/AdminList";


function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>  
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Navigate to="/auth/login" />}>
          <Route index element={<Dashboard/>} />
          <Route path="productViewer" element={<AliExpressViewer/>} /> 
          <Route path="addProduct" element={<AliExpressProductForm/>} /> 
          <Route path="productList" element={<ProductListPage/>} /> 
          <Route path="about" element={<About/>} />
          <Route path="adminList" element={<AdminList/>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
        <Route path="/auth">
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
