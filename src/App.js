import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LayoutSetting from "./LayoutSetting";
import Login from "./pages/Login/Login";
//seller----------------
import Sellers from "./pages/Sellers/Sellers";
import SellerHome from "./pages/Sellers/SellerHome";
import SellerBasicInfo from "./pages/Sellers/SellerBasicInfo/SellerBasicInfo";
import SellerBasicInfoEdit from "./pages/Sellers/SellerBasicInfoEdit/SellerBasicInfoEdit";

//driver----------------
import Drivers from "./pages/Drivers/Drivers";
import DriverHome from "./pages/Drivers/DriverHome";
import DriverBasicInfo from "./pages/Drivers/DriverBasicInfo/DriverBasicInfo";
import DriverBasicInfoEdit from "./pages/Drivers/DriverBasicInfoEdit/DriverBasicInfoEdit";
import DriverVehicleInfoEdit from "./pages/Drivers/DriverVehicleInfoEdit/DriverVehicleInfoEdit";

//Buyer----------------
import Buyers from "./pages/Buyers/Buyers";
import BuyerHome from "./pages/Buyers/BuyerHome";
import BuyerBasicInfo from "./pages/Buyers/BuyerBasicInfo/BuyerBasicInfo";
import BuyerBasicInfoEdit from "./pages/Buyers/BuyerBasicInfoEdit/BuyerBasicInfoEdit";

//Order----------------
import Orders from "./pages/Orders/Orders";
import OrderHome from "./pages/Orders/OrderHome";
import OrderBasicInfo from "./pages/Orders/OrderBasicInfo/OrderBasicInfo";
import OrderBasicInfoEdit from "./pages/Orders/OrderBasicInfoEdit/OrderBasicInfoEdit";

//Refuns----------------
import Refund from "./pages/Refund/Refund";
import RefundHome from "./pages/Refund/RefundHome";
//Rides----------------
import Pricing from "./pages/Pricing/Pricing";

//Transactions----------------
import Transactions from "./pages/Transactions/Transactions";

//app misc----------------
import AppMisc from "./pages/AppMisc/AppMisc";
import AppMiscHome from "./pages/AppMisc/AppMiscHome";

//Settings----------------
import Settings from "./pages/Settings/Settings";
import SettingsHome from "./pages/Settings/SettingsHome";
import SettingsEditAppInfo from "./pages/Settings/EditAppInfo/EditAppInfo";
import SettingsEditContact from "./pages/Settings/EditContact/EditContact";
import ProtectedRoute from "./utils/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/products/Product-Detail";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutSetting />
          </ProtectedRoute>
        }
      >
        <Route index={true} element={<Dashboard />} />

        <Route path="pricing" element={<Pricing />} />
        <Route path="transaction" element={<Transactions />} />

        {/* order routes */}
        <Route path="order" element={<Orders />}>
          <Route index={true} element={<OrderHome />} />
          <Route path="detail/:orderId" element={<OrderBasicInfo />} />
          <Route
            path="basicInfoEdit/:orderId"
            element={<OrderBasicInfoEdit />}
          />
        </Route>

        {/* refund routes */}
        <Route path="refund" element={<Refund />}>
          <Route index={true} element={<RefundHome />} />
          {/* <Route path="detail/:orderId" element={<OrderBasicInfo />} />
          <Route
            path="basicInfoEdit/:orderId"
            element={<OrderBasicInfoEdit />}
          /> */}
        </Route>

        {/* buyer routes */}
        <Route path="buyer" element={<Buyers />}>
          <Route index={true} element={<BuyerHome />} />
          <Route path="detail/:buyerId" element={<BuyerBasicInfo />} />
          <Route
            path="basicInfoEdit/:buyerId"
            element={<BuyerBasicInfoEdit />}
          />
        </Route>

        {/* driver routes */}
        <Route path="driver" element={<Drivers />}>
          <Route index={true} element={<DriverHome />} />
          <Route path="detail/:driverId" element={<DriverBasicInfo />} />
          <Route
            path="basicInfoEdit/:driverId"
            element={<DriverBasicInfoEdit />}
          />
          <Route
            path="vehicleInfoEdit/:driverId"
            element={<DriverVehicleInfoEdit />}
          />
        </Route>

        {/* seller routes */}
        <Route path="seller" element={<Sellers />}>
          <Route index={true} element={<SellerHome />} />
          <Route path="detail/:sellerId" element={<SellerBasicInfo />} />
          <Route
            path="basicInfoEdit/:sellerId"
            element={<SellerBasicInfoEdit />}
          />
        </Route>

        {/* product routes */}
        <Route path="product/:id" element={<ProductDetail />} />

        {/* setting routes */}
        <Route path="setting" element={<Settings />}>
          <Route index={true} element={<SettingsHome />} />
          <Route path="editAppContact" element={<SettingsEditContact />} />
          <Route path="editAppInfo" element={<SettingsEditAppInfo />} />
        </Route>

        {/* product companies routes */}
        <Route path="AppMisc" element={<AppMisc />}>
          <Route index={true} element={<AppMiscHome />} />
        </Route>
        {/* error route */}
        <Route
          path="*"
          element={<h1 className="text-center">404 Not Found</h1>}
        />
      </Route>
    </Routes>
  );
}

export default App;
