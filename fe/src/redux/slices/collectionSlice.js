import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: []
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addCollection: (state, action) => {
        state.collections.push(action.payload)
    },
    getAllCollections: (state, action) => {
        state.collections = action.payload
    },
    removeCollection: (state, action) => {
        state.collections = action.payload
    },
    removeProducts: (state, action) => {
        state.collections = state.collections.map(collection => {
          if (collection._id === action.payload._id) {
            return action.payload
          }
          return collection
        })
    },
    addProducts: (state, action) => {
        state.collections = state.collections.map(collection => {
          if (collection._id === action.payload.id) {
            collection.productList = [...collection.productList, ...action.payload.productList]
          }
          return collection
        })
    },
    renameCollection: (state, action) => {
      state.collections = state.collections.map(collection => {
        if (collection._id === action.payload.id) {
          collection.name = action.payload.newName
        }
        return collection
      })
    }
  }
});

export const { addCollection, getAllCollections, removeCollection, removeProducts, addProducts, renameCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
