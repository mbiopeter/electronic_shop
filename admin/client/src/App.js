import Dashboard from "./presentation/pages/dashboard/Dashboard";
import './App.css';
import UpBar from "./presentation/constants/upbar/UpBar";
import SideBar from "./presentation/constants/sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import Category from "./presentation/pages/category/Category";
import SubCategory from "./presentation/pages/subCategory/SubCategory";
import Brands from "./presentation/pages/brands/Brands";
import Orders from "./presentation/pages/orders/Orders";
import { PrimeReactProvider } from 'primereact/api';
import Coupon from "./presentation/pages/coupon/Coupon";
import Notification from "./presentation/pages/notification/Notification";
import Posters from "./presentation/pages/posters/Posters";
import VariantType from "./presentation/pages/variantType/VariantType";
import Variant from "./presentation/pages/variant/Variant";
import Details from "./presentation/pages/details/Details";
import { all_products } from "./data/dashboard/table_data";
import Settings from "./presentation/pages/settings/Settings";


function App() {
  const [expand, setExpand] = useState(false);
  const [products, setProducts] = useState(all_products);


  //mode
  const[activeMode,setActiveMode] = useState();
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'Dark'; // Default to Dark mode if nothing is saved
    setActiveMode(savedMode);
    const root = document.documentElement;
    if(savedMode === 'Dark'){
        root.classList.remove('light-mode');
        localStorage.setItem('theme', savedMode); 
    }
    if(savedMode === 'Light'){
        root.classList.add('light-mode');
        localStorage.setItem('theme', savedMode); 
    }
  }, []);

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
                  <Route path="/" element={<Dashboard products={products}  setProducts={setProducts}/>} />
                  <Route path="/details/:id" element={<Details products={products} />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/category/details/:id" element={<Details />} />
                  <Route path="/subCategory" element={<SubCategory />} />
                  <Route path="/subCategory/details/:id" element={<Details />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/brands/details/:id" element={<Details />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/coupon" element={<Coupon />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/posters" element={<Posters />} />
                  <Route path="/variantType" element={<VariantType />} />
                  <Route path="/variant" element={<Variant />} />
                  <Route path="/settings" element={<Settings activeMode={activeMode} setActiveMode={setActiveMode}/>} />
                </Routes>
              </div>
        </Router>
      </div>
    </PrimeReactProvider>
  )
}

export default App;
