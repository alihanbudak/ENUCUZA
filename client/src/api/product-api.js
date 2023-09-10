import axios from "axios";
export const getProductFromDB = async () => {
  const response = await axios.get("http://localhost:5000/api/product");
  return response.data;
};
export const addProductDB = async (
  urun_full_adi,
  urun_turu,
  urun_marka_adi,
  urun_pazar_adi,
  urun_fiyat
) => {
  const response = await axios
    .post("http://localhost:5000/api/product", {
      urun_full_adi,
      urun_turu,
      urun_marka_adi,
      urun_pazar_adi,
      urun_fiyat,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
export const deleteProductDB = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/product/${id}`
  );
  return response.data;
};
