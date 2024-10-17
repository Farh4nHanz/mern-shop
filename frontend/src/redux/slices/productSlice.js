import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/products`);

      if (!res.data.success) return rejectWithValue(res.data.message);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch all products!"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/products`, productData);

      if (!res.data.success) return res.data.message;

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to add product!"
      );
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "product/deleteProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/products/${id}`);

      if (!res.data.success) return rejectWithValue(res.data.message);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to delete product!"
      );
    }
  }
);

export const deleteAllProducts = createAsyncThunk(
  "product/deleteAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/products`);

      if (!res.data.success) return rejectWithValue(res.data.message);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to delete all products!"
      );
    }
  }
);

export const updateProductById = createAsyncThunk(
  "product/updateProductById",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/products/${id}`, updatedProduct);

      if (!res.data.success) return rejectWithValue(res.data.message);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to update product!"
      );
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  success: false,
  message: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.success = false;
        state.message = action.payload;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.success = false;
        state.message = action.payload;
      })
      .addCase(deleteAllProducts.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.products = [];
      })
      .addCase(deleteAllProducts.rejected, (state, action) => {
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.meta.arg.id ? action.payload.data : product
        );
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.success = false;
        state.message = action.payload;
      });
  },
});

export const { resetMessages } = productSlice.actions;
export default productSlice.reducer;
