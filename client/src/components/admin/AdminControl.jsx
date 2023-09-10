import React from "react";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { setUrunler } from "../../store/slices/marketSlice";
import { useSelector } from "react-redux";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Formik } from "formik";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// table fnish
import { useState } from "react";
import {
  addProductDB,
  getProductFromDB,
  deleteProductDB,
} from "../../api/product-api";
const AdminControl = () => {
  const [urun, setUrunlers] = useState({
    urun_full_adi: "",
    urun_turu: "",
    urun_marka_adi: "",
    urun_pazar_adi: "",
    urun_fiyat: "",
  });
  const dispatch = useDispatch();
  const { urunler } = useSelector((state) => state.market);
  const getProductFunction = async () => {
    const response = await getProductFromDB(); // apiden gelen verileri response değişkenine atadık
    dispatch(setUrunler(response)); // response değişkenini global state e atadık
  };
  const deleteProductDBFunction = async (id) => {
    const response = await deleteProductDB(id);
    getProductFunction();
  };

  const setProduct = async (
    urun_full_adi,
    urun_turu,
    urun_marka_adi,
    urun_pazar_adi,
    urun_fiyat
  ) => {
    const response = await addProductDB(
      urun_full_adi,
      urun_turu,
      urun_marka_adi,
      urun_pazar_adi,
      urun_fiyat
    );

    getProductFunction();
  };
  return (
    <div className="flex flex-col items-center   justify-center w-full h-auto p-1 gap-1 bg-slate-500">
      <div>
        <div className="flex  w-full p-10 my-5 items-center justify-center ">
          <p className="text-5xl text-green-100 font-serif font-light">
            Admin Control
          </p>
        </div>
        <div className="flex">
          <Formik
            initialValues={urun}
            validationSchema={Yup.object({
              urun_full_adi: Yup.string().required("Ürün adı zorunludur"),
              urun_fiyat: Yup.number().required("Ürün fiyatı zorunludur"),
              urun_marka_adi: Yup.string().required("Ürün markası zorunludur"),
              urun_pazar_adi: Yup.string().required("Ürün pazarı zorunludur"),
              urun_turu: Yup.string().required("Ürün türü zorunludur"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              var urun = urunler.filter(
                (product) =>
                  product.urun_full_adi === values.urun_full_adi &&
                  product.urun_marka_adi === values.urun_marka_adi &&
                  product.urun_pazar_adi === values.urun_pazar_adi &&
                  product.urun_turu === values.urun_turu
              );
              if (urun.length > 0 || urun === null) {
                alertify.error("Ürün zaten mevcut");
              } else {
                setProduct(
                  values.urun_full_adi,
                  values.urun_turu,
                  values.urun_marka_adi,
                  values.urun_pazar_adi,
                  values.urun_fiyat
                );
                setTimeout(() => {
                  // ctrl k+c yorum
                  // ctrl k+u yorumu aç
                  // resetForm();
                  // setSubmitting(false);
                }, 1000);
              }

              setSubmitting(false);
            }}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center justify-center w-[900px] p-3 gap-5 "
              >
                <div className="flex flex-row  items-center justify-center w-full gap-2">
                  <label
                    htmlFor="urun_full_adi"
                    className="text-xl text-green-100 font-serif font-light w-1/3"
                  >
                    Ürün Full Adı{" "}
                  </label>
                  <input
                    type="text"
                    id="urun_full_adi"
                    name="urun_full_adi"
                    placeholder="Ürün Full Adı"
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={formik.handleChange}
                    value={formik.values.urun_full_adi}
                  />

                  <div className="text-red-200 w-1/3">
                    {formik.touched.urun_full_adi &&
                    formik.errors.urun_full_adi ? (
                      <>{formik.errors.urun_full_adi}</>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row  items-center justify-center w-full gap-2">
                  <label
                    htmlFor="urun_turu"
                    className="text-xl text-green-100 font-serif font-light w-1/3"
                  >
                    Urun turu
                  </label>
                  <input
                    type="text"
                    id="urun_turu"
                    name="urun_turu"
                    placeholder="urun_turu"
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={formik.handleChange}
                    value={formik.values.urun_turu}
                  />
                  <div className="text-red-200 w-1/3">
                    {formik.touched.urun_turu && formik.errors.urun_turu ? (
                      <>{formik.errors.urun_turu}</>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row  items-center justify-center w-full gap-2">
                  <label
                    htmlFor="urun_marka_adi"
                    className="text-xl text-green-100 font-serif font-light w-1/3"
                  >
                    urun_marka_adi
                  </label>
                  <input
                    type="text"
                    id="urun_marka_adi"
                    name="urun_marka_adi"
                    placeholder="urun_marka_adi"
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={formik.handleChange}
                    value={formik.values.urun_marka_adi}
                  />
                  <div className="text-red-200 w-1/3">
                    {formik.touched.urun_marka_adi &&
                    formik.errors.urun_marka_adi ? (
                      <>{formik.errors.urun_marka_adi}</>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row  items-center justify-center w-full gap-2">
                  <label
                    htmlFor="urun_pazar_adi"
                    className="text-xl text-green-100 font-serif font-light w-1/3"
                  >
                    urun_pazar_adi
                  </label>
                  <select
                    placeholder="urun_pazar_adi"
                    type="text"
                    id="urun_pazar_adi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={formik.handleChange}
                    value={formik.values.urun_pazar_adi}
                  >
                    <option value={""}>Pazar seçiniz</option>

                    <option value={"Bim"}>Bim</option>
                    <option value={"A101"}>A101</option>
                    <option value={"Migros"}>Migros</option>
                    <option value={"Şok"}>Şok</option>
                  </select>
                  <div className="text-red-200 w-1/3">
                    {formik.touched.urun_pazar_adi &&
                    formik.errors.urun_pazar_adi ? (
                      <>{formik.errors.urun_pazar_adi}</>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row  items-center justify-center w-full gap-2">
                  <label
                    htmlFor="urun_fiyat"
                    className="text-xl text-green-100 font-serif font-light w-1/3"
                  >
                    urun_fiyat
                  </label>
                  <input
                    type="text"
                    id="urun_fiyat"
                    name="urun_fiyat"
                    placeholder="urun_fiyat"
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    onChange={formik.handleChange}
                    value={formik.values.urun_fiyat}
                  />
                  <div className="text-red-200 w-1/3">
                    {formik.touched.urun_fiyat && formik.errors.urun_fiyat ? (
                      <>{formik.errors.urun_fiyat}</>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <button
                    type="submit"
                    className="w-full px-3 py-2 text-white bg-indigo-700 rounded-md disabled:bg-indigo-400 focus:outline-none"
                    disabled={!formik.dirty || formik.isSubmitting}
                  >
                    Ürün Ekle
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="flex w-full  mt-10 mb-10">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Urun Full Adi</TableCell>

                  <TableCell align="right">Ürün Türü</TableCell>
                  <TableCell align="right">Marka Adı</TableCell>
                  <TableCell align="right">Pazar</TableCell>
                  <TableCell align="right">Fiyat&nbsp;(TL)</TableCell>
                  <TableCell align="right">Islem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urunler.map((urun) => (
                  <TableRow
                    key={urun._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    <TableCell component="th" scope="row">
                      {urun.urun_full_adi}
                    </TableCell>

                    <TableCell align="right">{urun.urun_turu}</TableCell>
                    <TableCell align="right">{urun.urun_marka_adi}</TableCell>
                    <TableCell align="right">{urun.urun_pazar_adi}</TableCell>
                    <TableCell align="right">{urun.urun_fiyat}</TableCell>
                    <TableCell align="right">
                      <i
                        onClick={() => deleteProductDBFunction(urun._id)}
                        className=""
                      >
                        <DeleteOutlineOutlinedIcon
                          className="text-base text-red-400 drop-shadow-md hover:text-red-600
                "
                        />
                      </i>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
