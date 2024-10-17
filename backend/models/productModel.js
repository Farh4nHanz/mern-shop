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
    slug: {
      type: String,
      unique: true,
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
  this.slug = `${_.kebabCase(this.name)}-${+new Date()}`;

  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.$set && this._update.$set.name) {
    this._update.$set.name = _.startCase(this._update.$set.name);
    this._update.$set.slug = `${_.kebabCase(
      this._update.$set.name
    )}-${+new Date()}`;
  }

  next();
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
