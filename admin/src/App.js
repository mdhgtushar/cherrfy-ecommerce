import {Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import AliExpressViewer from "./pages/AliExpressViewer";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";


function App() {
  return (
    <div>  
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="productViewer" element={<AliExpressViewer/>} /> 
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
