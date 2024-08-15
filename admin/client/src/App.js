import Dashboard from "./presentation/pages/dashboard/Dashboard";
import './App.css';
import UpBar from "./presentation/constants/upbar/UpBar";
import SideBar from "./presentation/constants/sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Category from "./presentation/pages/category/Category";
import SubCategory from "./presentation/pages/subCategory/SubCategory";
import Brands from "./presentation/pages/brands/Brands";
import Orders from "./presentation/pages/orders/Orders";
import { PrimeReactProvider } from 'primereact/api';


function App() {
  const [expand, setExpand] = useState(false);

  return (
    <PrimeReactProvider>
      <div className="main-background">
        <Router>
            <SideBar 
              expand={expand}
              setExpand={setExpand}
            />
            <div className="main" style={expand == false? {width: 'calc(100% - var(--larger-width))',}:{ transition:'all var(--transition-duration) linear'}}>
                <UpBar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/subCategory" element={<SubCategory />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
        </Router>
      </div>
    </PrimeReactProvider>
  )
}

export default App;
