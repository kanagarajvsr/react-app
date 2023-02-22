import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWrapper } from '../utils/fetch';


export const getUsers = createAsyncThunk('getUsers', async () => {
  try {
    const { data } = await fetchWrapper.get(`/user`)
    return data
  } catch (error) { // return custom error message from API if any
     
  }
})

export const userLogin = createAsyncThunk('', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await fetchWrapper.post(`/login`, { email, password })
    localStorage.setItem('userToken', data.token);// store user's token in local storage
    return data
  } catch (error) { // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

export const UserSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("active") ? true : false,
    userToken: localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null,
    userInfo: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userInfo= null;
      state.userToken= null;
      state.isAuthenticated = false;
      localStorage.removeItem("active");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled,(state,{payload})=>{
        state.users = payload;
        return state;
    })
    builder.addCase(userLogin.pending,(state,{payload})=>{
      state.loading = true
      state.error = null
      return state;
    })
    builder.addCase(userLogin.fulfilled,(state,{payload})=>{
      state.loading = false
      state.isAuthenticated = true
      state.userToken = payload.token
      delete payload.token;
      state.userInfo = payload;
      localStorage.setItem("active", state.isAuthenticated);
      return state;
    })
    builder.addCase(userLogin.rejected,(state,{payload})=>{
      state.loading = false
      state.error = payload
      localStorage.setItem("active", state.isAuthenticated);
      return state;
    }) 
}
});


export const { logout } = UserSlice.actions;
export const selectUser = (state) => state.auth.isAuthenticated;
export default UserSlice.reducer;