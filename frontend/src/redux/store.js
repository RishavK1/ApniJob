import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import jobSlice from "./jobSlice.js";
const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authSlice,
        job: jobSlice,
    },
});
export default store;