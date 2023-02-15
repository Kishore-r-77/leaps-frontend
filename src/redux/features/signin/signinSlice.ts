import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userObj } from "../../../TsTypes/signinSliceTypes";

const initialState: userObj = {
  loading: false,
  isLogged: false,
  usernameOrEmail: "",
  password: "",
  user: {},
  error: "",
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { getState }) => {
    const state: any = getState();

    const resp = await axios.post("http://localhost:8080/api/auth/signin", {
      usernameOrEmail: state.users.usernameOrEmail,
      password: state.users.password,
    });

    sessionStorage.setItem("token", resp.data.accessToken);
    return resp.data;
  }
);

const signinSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onChangeUsername: (state, action) => {
      state.usernameOrEmail = action.payload;
    },
    onChangePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserDetails.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isLogged = true;
        state.usernameOrEmail = state.usernameOrEmail;
        state.password = state.password;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.user = {};
      state.error = action.error.message || "Something Went Wrong";
    });
  },
});

export default signinSlice.reducer;
export const { onChangeUsername, onChangePassword } = signinSlice.actions;
