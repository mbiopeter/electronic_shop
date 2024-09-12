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
import { handleProtectedRoutes } from "./logical/settings/Roles";
import NotFound from "./presentation/pages/404/404";
import Users from "./presentation/pages/users/Users";
import RolesPage from "./presentation/pages/roles/Roles";
import Emails from "./presentation/pages/emails/Emails";

function App() {
  const [expand, setExpand] = useState(false);
  const [products, setProducts] = useState(all_products);
  const [transparentSideBar, setTransparentSideBar] = useState(false);
  const [sideBarChecked, setSideBarChecked] = useState(null);
  const[roles,setRoles] = useState(handleProtectedRoutes());

  // Mode and Sidebar states
  const [activeMode, setActiveMode] = useState();

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'Light';
    const sideBar = localStorage.getItem('transparentSideBar');

    setActiveMode(savedMode);
    const root = document.documentElement;

    if (savedMode === 'Dark') {
      root.classList.remove('light-mode');
    } else if (savedMode === 'Light') {
      root.classList.add('light-mode');
    } else {
      const savedThemes = JSON.parse(localStorage.getItem('themes')) || {};
      const selectedTheme = savedThemes[savedMode];
      if (selectedTheme) {
        Object.keys(selectedTheme).forEach(variable => {
          root.style.setProperty(variable, `#${selectedTheme[variable]}`);
        });
        root.classList.remove('light-mode');
      }
    }

    setTransparentSideBar(sideBar);
    setSideBarChecked(sideBar);
  
  }, []);
  useEffect(() => {
    setRoles(handleProtectedRoutes());
  },[])

    const rolesArray = [
      roles.dashboard,
      roles.category,
      roles.subCategory,
      roles.brand,
      roles.orders,
      roles.coupon,
      roles.notification,
      roles.poster,
      roles.variantType,
      roles.variant,
      roles.users,
      roles.userRoles,
      roles.emails
  ]

  return (
    <PrimeReactProvider>
      <div className="main-background">
        <Router>
          <SideBar
            expand={expand}
            setExpand={setExpand}
            transparentSideBar={transparentSideBar}
            roles ={roles}
          />
          <div className="main" style={expand ? {width:'100%'} : { width: 'calc(100% - var(--larger-width))' }}>
            <UpBar />
            <Routes>
            {rolesArray[0] 
              && <Route path="/" element={<Dashboard products={products} setProducts={setProducts} />} />}
            {rolesArray[0] &&<Route path="/details/:id" element={<Details products={products} />} />}
            {rolesArray[1] &&<Route path="/category" element={<Category />} />}
            {rolesArray[1] &&<Route path="/category/details/:id" element={<Details />} />}
            {rolesArray[2] &&<Route path="/subCategory" element={<SubCategory />} />}
            {rolesArray[2] &&<Route path="/subCategory/details/:id" element={<Details />} />}
            {rolesArray[3] &&<Route path="/brands" element={<Brands />} />}
            {rolesArray[3] &&<Route path="/brands/details/:id" element={<Details />} />}
            {rolesArray[4] &&<Route path="/orders" element={<Orders />} />}
            {rolesArray[5] &&<Route path="/coupon" element={<Coupon />} />}
            {rolesArray[6] &&<Route path="/notification" element={<Notification />} />}
            {rolesArray[7] &&<Route path="/posters" element={<Posters />} />}
            {rolesArray[8] &&<Route path="/variantType" element={<VariantType />} />}
            {rolesArray[9] &&<Route path="/variant" element={<Variant />} />}
            {rolesArray[10] &&<Route path="/users" element={<Users />} />}
            {rolesArray[11] &&<Route path="/users/roles/:id" element={<RolesPage />} />}
            {rolesArray[12] &&<Route path="/email" element={<Emails />} />}
              <Route path="/settings" element={
                <Settings
                  activeMode={activeMode}
                  setActiveMode={setActiveMode}
                  setTransparentSideBar={setTransparentSideBar}
                  sideBarChecked={sideBarChecked}
                  setSideBarChecked={setSideBarChecked}
                />
              } />
            <Route path="*" element={<NotFound />} /> 
            </Routes>

          </div>
        </Router>
      </div>
    </PrimeReactProvider>
  )
}

export default App;
