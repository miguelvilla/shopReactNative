import Product from "../../models/product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductsIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductsIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };
    default:
      return state;
  }
};
