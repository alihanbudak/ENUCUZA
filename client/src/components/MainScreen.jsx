import React from "react";
//table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { setUrunler } from "../store/slices/marketSlice";

import {
  
  getProductFromDB,

} from "../api/product-api";
// table bitis
const MainScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
        cyan: "#4c6591",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  const { urunler } = useSelector((state) => state.market);
  const productDetail = async (id) => {
    navigate("/product/" + id);
  };
  const getProductFunction = async () => {
    const response = await getProductFromDB(); // apiden gelen verileri response değişkenine atadık
    dispatch(setUrunler(response)); // response değişkenini global state e atadık
  };
  const yenile = ()=>{
    getProductFunction();
  }
  return (
    <div className="flex-col  w-full h-screen bg-blue-50 p-1 gap-1 items-start justify-center">
      <div className="flex w-full items-center justify-center p-1 my-5 text-5xl font-mono font-light text-blue-400">
        Tüm Ürünler
      </div>
      <div className="w-full h-20 text-right p-5 "> <span className="border cursor-pointer w-36 p-4 rounded-md border-blue-300 transition-all duration-200 hover:border-blue-500 " onClick={()=>yenile()} >Yenile</span></div>
      <div className="flex border border-black  w-full p-3 ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{backgroundColor:theme.palette.primary.cyan}} >
                <TableCell >Urun Full Adi</TableCell>

                <TableCell align="right">Ürün Türü</TableCell>
                <TableCell align="right">Marka Adı</TableCell>
                <TableCell align="right">Pazar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urunler.map((urun) => (
                <TableRow
                  key={urun._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="transition-all  cursor-pointer hover:bg-gray-100 ease-in-out duration-100 transform hover:-translate-y-1 "
                  onClick={() => productDetail(urun._id)}
                >
                  <TableCell component="th" scope="row">
                    {urun.urun_full_adi}
                  </TableCell>

                  <TableCell align="right">{urun.urun_turu}</TableCell>
                  <TableCell align="right">{urun.urun_marka_adi}</TableCell>
                  <TableCell align="right">{urun.urun_pazar_adi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MainScreen;
