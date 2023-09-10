// modelller birer tablo gibi düşünülebilir.
const mongose = require("mongoose");
//random id üretmek için nanoid
const { v4: uuidv4 } = require("uuid");

const { Schema } = mongose;

const ProductSchema = new Schema(
  {
    urun_no: { type: String, default: uuidv4() },
    urun_full_adi: { type: String, required: true },
    urun_turu: { type: String, required: true },
    urun_marka_adi: { type: String, required: true },
    urun_pazar_adi: { type: String, required: true },
    urun_fiyat: { type: Number, required: true },

    product_image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sucuk-2.jpg/1200px-Sucuk-2.jpg",
    },
  },
  { timestamps: true }
);
module.exports = mongose.model("product", ProductSchema);
