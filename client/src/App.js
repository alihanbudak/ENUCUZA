import React, { useEffect,  } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch,  } from "react-redux";
//import setCategories
import { setUrunler } from "./store/slices/marketSlice";
import { getProductFromDB } from "./api/product-api";

import "alertifyjs/build/css/alertify.css";
import MainScreen from "./components/MainScreen";
import { AdminControl } from "./components/admin";
import ProductDetail from "./components/ProductDetail";
const App = () => {

  const dispatch = useDispatch();



  const onload = async () => {
    const response = await getProductFromDB();
    dispatch(setUrunler(response));
  };

  const adminRoutes = [
    {
      path: "admin/*",
      element: <AdminControl />,
    },
  ];
  useEffect(() => {
    onload();
  }, []);
  return (
    <div className="w-full  gap-2  flex  flex-col  text-base font-bold  ">
      <Routes>
        <Route path="/*" element={<MainScreen />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
