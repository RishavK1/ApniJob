import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: {
      profile: {
        skills: [], // ✅ Default empty array to prevent undefined errors
      },
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload || { profile: { skills: [] } }; // ✅ Ensure profile & skills exist
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
