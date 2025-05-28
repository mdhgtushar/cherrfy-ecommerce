import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../util/API";

const initialState = {
    products: [],
    status: "idle",
    selectedProduct: {},
    error: null,
};

// ✅ Correct action type here
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await Api.get("/product/");
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id) => {
        const response = await Api.get("/product/" + id);
        return response.data;
    }
);

export const fetchAliProduct = createAsyncThunk(
    "products/fetchAliProduct",
    async (id) => {
        const response = await Api.get("/product/ali/" + id);
        return response.data;
    }
);


export const SaveAliProduct = createAsyncThunk(
    "products/saveAliProduct",
    async (id) => {
        const response = await Api.get("/product/ali/" + id);
        return response.data;
    }
);


export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId) => {
        const response = await Api.delete(`/product/${productId}`);
        return response.data;
    }
);


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => { 
            state.status = "idle";
            state.error = null;
            state.selectedProduct = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })

            .addCase(fetchProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAliProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAliProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.selectedProduct = action.payload;
            })
            .addCase(fetchAliProduct.rejected, (state, action) => {
                state.status = "failed"; 
                state.error = action.error.message;
            })
    },
});

export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
    state.products.products.find((product) => product.id === productId);

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
