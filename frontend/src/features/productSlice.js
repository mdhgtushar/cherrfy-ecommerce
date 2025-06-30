import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../util/API";
// Default to 'BD' if not set
const initialState = {
    products: [],
    status: "idle",
    selectedProduct: {},
    error: null,
};

// ✅ Correct action type here
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ country, currency }) => {
        const response = await Api.get("/product/?country=" + country + "&currency=" + currency); // Assuming 'BD' is the country code
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async ({ id, country, currency }) => {
        const response = await Api.get("/product/" + id + "?country=" + country + "&currency=" + currency); // Assuming 'BD' is the country code
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
export const fetchLogistic = createAsyncThunk(
    "products/fetchLogistic",
    async (data) => {
        const response = await Api.post("/logistic", data);
        return response.data;
    }
);

export const SaveAliProduct = createAsyncThunk(
    "products/saveAliProduct",
    async (id) => {
        const response = await Api.get("/product/ali/create/" + id);
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
                state.products = action.payload.data || [];
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
                console.log("Product fetched by ID:", action.payload);
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
                state.error = action.payload;
            })
            .addCase(SaveAliProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(SaveAliProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.selectedProduct = action.payload;
            })
            .addCase(SaveAliProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchLogistic.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLogistic.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                // Assuming the response contains logistic data
                state.selectedProduct.logistic = action.payload;
            })
            .addCase(fetchLogistic.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
    state.products.products.find((product) => product.id === productId);

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
