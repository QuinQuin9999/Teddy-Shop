import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        search: '',
        searchPriceRange: [0,10000000],
        searchColor: '',
        searchSize: '', 
        searchMaterial: '', 
    },
    reducers: {
        searchProduct: (state, action) => {
            state.search = action.payload;
        },
        setSearchPriceRange: (state, action) => {  
            state.searchPriceRange = action.payload;
        },
        setSearchColor: (state, action) => { 
            state.searchColor = action.payload;
        },
        setSearchSize: (state, action) => { 
            state.searchSize = action.payload;
        },
        setSearchMaterial: (state, action) => { 
            state.searchMaterial = action.payload;
        }
    },
});

export const { searchProduct, setSearchPriceRange, setSearchColor, setSearchSize, setSearchMaterial } = productSlice.actions;

export default productSlice.reducer;