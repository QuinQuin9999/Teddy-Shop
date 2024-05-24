import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    orderItems: [
      // {
      //   id: ,
      //   name: ,
      //   type: ,
      //   price: ,
      //   discount: p,
      //   img:
      // }
    ],
    tempChecklist: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
    tempOther: {}
  },
  reducers: {
    resetCart: (state) => {
      state.orderItems = [];
      state.shippingAddress = {};
      state.paymentMethod = "";
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.user = "";
      state.isPaid = false;
      state.paidAt = "";
      state.isDelivered = false;
      state.deliveredAt = "";
      state.tempChecklist = [];
    },
    addCartProduct: (state, action) => {
      const product = action.payload;
      const productFind = state.orderItems.find(
        (item) => item?.id === product.id
      );
      console.log("productFind: ", productFind);
      if (productFind) {
        productFind.amount += product.amount;
      } else if (!state.orderItems) {
        state.orderItems = [product];
      } else {
        state.orderItems = [...state.orderItems, product];
      }
      console.log(product);
      console.log("cart product: ", state.orderItems.length);
    },
    removeCartProduct: (state, action) => {
      const { idProduct } = action.payload;
      console.log("before filter: ", state.orderItems);
      let productFilter = [];
      if (idProduct != -1) {
        productFilter = state.orderItems.filter(
          (item) => item?.id != idProduct
        );
      }
      console.log("product filter: ", productFilter);
      state.orderItems = productFilter;
    },
    increaseProductAmount: (state, action) => {
      const idProduct = action.payload.idProduct;
      let product = state.orderItems.find((item) => item.id == idProduct);
      if (product) {
        console.log(product);
        product.amount += 1;
      }
    },
    decreaseProductAmount: (state, action) => {
      const idProduct = action.payload.idProduct;
      console.log(state.orderItems);
      let product = state.orderItems.find((item) => item?.id === idProduct);
      product.amount -= 1;
    },
    saveTempChecklist: (state, action) => {
      const checklist = action.payload;
      state.tempChecklist = checklist;
    },
    deleteTempChecklist: (state, action) => {
      state.tempChecklist = [];
    },
    saveTempOther: (state, action) => {
      state.tempOther = action.payload
      console.log("temp other after save: ", state.tempOther)
    },
    deleteTempOther: (state, action) => {
      state.tempOther = {}
    },
  },
});
export const {
  addCartProduct,
  removeCartProduct,
  increaseProductAmount,
  decreaseProductAmount,
  resetCart,
  saveTempChecklist,
  deleteTempChecklist,
  saveTempOther,
  deleteTempOther,
} = cartSlice.actions;
export default cartSlice.reducer;
