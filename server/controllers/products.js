const { json } = require("express");
const urun = require("../models/urunler");
const { default: mongoose } = require("mongoose");

const getUrunler = async (req, res) => {
  try {
    const urunler = await urun.find();
    res.status(200).json(urunler);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateUrunler = async (req, res) => {
  const _id = req.params.id;
  const urun_full_adi = req.body.urun_full_adi;
  const urun_turu = req.body.urun_turu;
  const urun_marka_adi = req.body.urun_marka_adi;
  const urun_pazar_adi = req.body.urun_pazar_adi;
  const urun_fiyat = req.body.urun_fiyat;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  const updatedProduct = {
    _id,
    urun_full_adi,
    urun_turu,
    urun_marka_adi,
    urun_pazar_adi,
    urun_fiyat,
  };

  await urun.findByIdAndUpdate(_id, updatedProduct, { new: true });

  res.json(updatedProduct);
};

const createUrun = async (req, res) => {
  const urun_full_adi = req.body.urun_full_adi;
  const urun_turu = req.body.urun_turu;
  const urun_marka_adi = req.body.urun_marka_adi;
  const urun_pazar_adi = req.body.urun_pazar_adi;
  const urun_fiyat = req.body.urun_fiyat;

  const newUrunler = new urun({
    urun_full_adi,
    urun_turu,
    urun_marka_adi,
    urun_pazar_adi,
    urun_fiyat,
  });

  console.log("this is new product : \n " + newUrunler);
  try {
    await newUrunler.save();
    res.status(201).json(newUrunler);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error);
  }
};

const clearUrunler = async (req, res) => {
  try {
    await urun.deleteMany();
    res.status(200).json({ message: "All products deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteUrun = async (req, res) => {
  const id = req.params.id;
  try {
    await urun.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted " + id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUrunler,
  createUrun,
  clearUrunler,
  deleteUrun,
  updateUrunler,
};
