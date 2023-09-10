const express = require("express");

const {
  getUrunler,
  createUrun,
  updateUrunler,
  deleteUrun,
  clearUrunler,
} = require("../controllers/products");
const router = express.Router();

router.get("/", getUrunler);
router.post("/", createUrun); 

router.delete("/", clearUrunler);
router.delete("/:id", deleteUrun);

router.put("/:id", updateUrunler);

module.exports = router;
