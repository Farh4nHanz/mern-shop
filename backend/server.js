import connectDB from "./config/db.js";
import e from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

const app = e();
const port = process.env.PORT;

const __dirname = path.resolve();

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
app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: "user",
      age: 30,
    }
  })
})

if (process.env.NODE_ENV === "production") {
  app.use(e.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
