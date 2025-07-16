import { createSlice } from '@reduxjs/toolkit';

const imageAnimation = createSlice({
    name: 'imgAnimation',
    initialState: {
        isimageAnimation: true,
    },
    reducers: {
        setimageAnimation: (state, action) => {
            state.isimageAnimation = action.payload;
        } 
    },
});

export const {setimageAnimation} = imageAnimation.actions;
export default imageAnimation.reducer;