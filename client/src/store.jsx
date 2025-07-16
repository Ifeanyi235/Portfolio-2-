import { configureStore } from '@reduxjs/toolkit';
import imageAnimationReducer from "./imageAnimation";

export const store = configureStore({
    reducer: {
        imageAnimationState: imageAnimationReducer,
    }
});