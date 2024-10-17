import connectDB from "./config/db.js";
import e from "express";
import cors from "cors";
import morgan from "morgan";

const app = e();
const port = process.env.PORT;

app.use(cors());

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

// logger
process.env.NODE_ENV === "development"
  ? app.use(morgan("dev"))
  : app.use(
      morgan("combined", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      })
    );

// routes
import productRoutes from "./routes/productRoutes.js";

app.use("/api/v1/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
