import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";
const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const { urunler } = useSelector((state) => state.market);
  const [seciliUrun, setseciliUrun] = React.useState({});
  const seciliUruns = urunler.find((urun) => urun._id === id);
  useEffect(() => {
    console.log(seciliUruns);
    setseciliUrun(seciliUruns);
  }, [seciliUruns]);

  const ayniMarkaAyniTurdekiUrunler = urunler
    .filter(
      (urun) =>
        urun.urun_marka_adi === seciliUrun.urun_marka_adi &&
        urun.urun_turu === seciliUrun.urun_turu &&
        urun._id !== seciliUrun._id
    )
    .sort((b, a) => b.urun_fiyat - a.urun_fiyat);

  const ayniTurdekiUrunler = urunler
    .filter(
      (urun) =>
        urun.urun_turu === seciliUrun.urun_turu && urun._id !== seciliUrun._id
    )
    .sort((b, a) => b.urun_fiyat - a.urun_fiyat);

  const getResimUrl = (pazarAdi) => {
    switch (pazarAdi) {
      case "Bim":
        return "https://www.bim.com.tr/templates/images/bim-logo-single.png";
      case "A101":
        return "https://ayb.akinoncdn.com/static_omnishop/ayb808/assets/img/logo%40a101-2x.png";
      case "Migros":
        return "https://s3-symbol-logo.tradingview.com/migros-ticaret--600.png";
      case "Şok":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%C5%9EOK_Market_logo.svg/800px-%C5%9EOK_Market_logo.svg.png";

      default:
        return "";
    }
  };
  const changeSeciliUrun = (urun) => {
    setseciliUrun(urun);
  };
  const mapteAc = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${seciliUrun.urun_pazar_adi}`
    );
  };
  const goBackPage = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex text-4xl text-red-500 mt-10 font-serif font-extrabold ">
        EN UCUZA
      </div>
      <div className="flex flex-col p-1 w-4/5 h-auto  gap-3 justify-start  items-start ">
        <div className="flex flex-row gap-4 border border-gray-300 p-4 w-full min-h-[533px] my-10">
          <div className="w-1/5 border rounded-lg border-gray-800">
            <div className="text-xl text-gray-900  p-3 text-center font-mono font-light">
              Seçili Urun
            </div>
            <div className="flex flex-col  w-full h-auto p-1">
              <img
                className="w-full h-full object-contain"
                src={getResimUrl(seciliUrun.urun_pazar_adi)}
                alt=""
              />
              <p className="text-xl text-gray-900  p-3 text-center font-mono font-light">
                {seciliUrun.urun_full_adi}
              </p>
              <div className="flex items-center justify-between">
                <button
                  className="border border-gray-400 text-center text-sm w-2/3 font-light hover:bg-blue-200 h-16"
                  onClick={() => mapteAc()}
                >
                  Mapte Göster
                </button>
                <p className="text-xl text-gray-900  p-3 text-right font-mono font-light">
                  {seciliUrun.urun_fiyat} ₺
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-4/5   ">
            <div className=" text-4xl text-green-500 font-mono font-light border-b rounded-lg border-black w-full h-20 p-4 text-center">
              Aynı Marka Ürün Diğer Marketlerde
            </div>
            <div className="flex  w-full p-1 h-full">
              {ayniMarkaAyniTurdekiUrunler.map((urun) => (
                <div className="flex flex-col gap-3 w-1/3 p-1">
                  <div className="flex flex-col gap-3 w-full h-full border rounded-lg hover:scale-105 cursor-pointer transition-all ease-in-out duration-200 border-black p-5">
                    <p className="text-xl text-gray-900  p-3 text-center font-mono font-light">
                      {urun.urun_pazar_adi}
                    </p>
                    <img
                      className="w-full h-2/3 object-contain"
                      src={getResimUrl(urun.urun_pazar_adi)}
                      alt=""
                    />
                    <p className="text-xl text-gray-900  p-3 text-center font-mono font-light">
                      {urun.urun_full_adi}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        className="border border-gray-400 text-center text-xl w-2/3 font-light hover:bg-blue-200 h-16"
                        onClick={() => changeSeciliUrun(urun)}
                      >
                        Seç
                      </button>
                      <p className="text-xl text-gray-900  p-3 text-right font-mono font-light">
                        {urun.urun_fiyat} ₺
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full  p-1">
          <div className=" text-4xl text-green-500 font-mono font-light border-b border-black w-full h-20 p-4 text-center">
            Aynı Tür Ürün Diğer Marketlerde
          </div>
          <div className="flex flex-wrap  justify-center  gap-3 w-full p-1 h-full ">
            {ayniTurdekiUrunler.map((urun) => (
              <div className="flex  gap-3 w-1/5  p-1">
                <div className="flex flex-col gap-3 w-full h-full border border-black p-6 rounded-xl hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer">
                  <p className="text-xl text-gray-900  p-3 text-center font-mono font-light">
                    {urun.urun_full_adi}
                  </p>
                  <img
                    className="w-full h-2/3 object-contain"
                    src={getResimUrl(urun.urun_pazar_adi)}
                    alt=""
                  />
                  <p className="text-xl text-gray-900  p-3 text-center font-mono font-light">
                    {urun.urun_full_adi}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      className="border border-gray-400 text-center text-xl w-2/3 font-light hover:bg-blue-200 h-16"
                      onClick={() => changeSeciliUrun(urun)}
                    >
                      Seç
                    </button>
                    <p className="text-xl text-gray-900  p-3 text-right font-mono font-light">
                      {urun.urun_fiyat} ₺
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <i
          className="absolute top-0 left-0 hover:scale-110 cursor-pointer  p-1 m-1 rounded"
          onClick={() => goBackPage()}
        >
          <UndoIcon />
        </i>
      </div>
    </div>
  );
};

export default ProductDetail;
