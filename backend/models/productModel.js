import mongoose from "mongoose";
import _ from "lodash";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

productSchema.pre("save", function (next) {
  this.name = _.startCase(this.name);

  next();
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
