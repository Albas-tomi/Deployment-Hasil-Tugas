import { createSlice } from "@reduxjs/toolkit";
import {
  createDataProduct,
  deleteDataProduct,
  getDataProduct,
  retrieveProductById,
  updateDataProductById,
} from "./productsThunk";

const initialState = {
  products: [],
  productEditDetail: {},
  loading: false,
  error: undefined,

  createProductLoading: false,
  errorCreateProduct: undefined,
  type: "",

  deleteProductLoading: false,
  errorDeleteProduct: undefined,

  ProductIdLoading: undefined,
  errorIdProduct: false,

  updateProductLoading: false,
  errorUpdateProduct: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    editProduct: (state, action) => {
      const { id, name, category, freshness, price, image, description } =
        action.payload;
      const pickOfProduct = state.find((product) => product.id === id);
      if (pickOfProduct) {
        pickOfProduct.name = name;
        pickOfProduct.category = category;
        pickOfProduct.freshness = freshness;
        pickOfProduct.description = description;
        pickOfProduct.image = image;
        pickOfProduct.price = price;
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      const pickOfProduct = state.find((product) => product.id === id);
      if (pickOfProduct) {
        return state.filter((product) => product.id !== id);
      }
    },
  },
  // RegionProduct
  extraReducers: (builder) => {
    builder
      .addCase(getDataProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
          type: action.type,
        };
      })
      .addCase(getDataProduct.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          loading: false,
          error: null,
          type: action.type,
        };
      })
      .addCase(getDataProduct.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
          type: action.type,
        };
      })

      // End Region Product

      // Region addProduct

      .addCase(createDataProduct.pending, (state, action) => {
        return {
          ...state,
          createProductLoading: true,
          errorCreateProduct: undefined,
          type: action.type,
        };
      })
      .addCase(createDataProduct.fulfilled, (state, action) => {
        return {
          ...state,
          createProductLoading: false,
          type: action.type,
        };
      })
      .addCase(createDataProduct.rejected, (state, action) => {
        return {
          ...state,
          errorCreateProduct: action.payload,
          createProductLoading: false,
          type: action.type,
        };
      })

      // End Region

      // Region Deelete

      .addCase(deleteDataProduct.pending, (state, action) => {
        return {
          ...state,
          deleteProductLoading: true,
          errorDeleteProduct: undefined,
          type: action.type,
        };
      })
      .addCase(deleteDataProduct.fulfilled, (state, action) => {
        return {
          ...state,
          deleteProductLoading: false,
          type: action.type,
        };
      })
      .addCase(deleteDataProduct.rejected, (state, action) => {
        return {
          ...state,
          errorDeleteProduct: action.payload,
          deleteProductLoading: false,
          type: action.type,
        };
      })

      // endregion

      // Region getdataBy ID
      .addCase(retrieveProductById.pending, (state) => {
        return {
          ...state,
          ProductIdLoading: true,
          errorIdProduct: undefined,
          // type: action.type,
        };
      })
      .addCase(retrieveProductById.fulfilled, (state, action) => {
        return {
          ...state,
          ProductIdLoading: false,
          productEditDetail: action.payload,
          // type: action.type,
        };
      })
      .addCase(retrieveProductById.rejected, (state, action) => {
        return {
          ...state,
          ProductIdLoading: action.payload,
          errorIdProduct: undefined,
          // type: action.type,
        };
      })

      // endregion

      // Region UpdateDataByID
      .addCase(updateDataProductById.pending, (state) => {
        return {
          ...state,
          updateProductLoading: true,
          errorUpdateProduct: undefined,
          // type: action.type,
        };
      })
      .addCase(updateDataProductById.fulfilled, (state, action) => {
        return {
          ...state,
          updateProductLoading: false,
          // type: action.type,
        };
      })
      .addCase(updateDataProductById.rejected, (state, action) => {
        return {
          ...state,
          errorUpdateProduct: action.payload,
          updateProductLoading: false,
          // type: action.type,
        };
      });
    // endregion
  },
});
export const { actions: productAction, reducer: productReducer } = productSlice;
