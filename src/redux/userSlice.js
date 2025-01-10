import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
  error: null,
  page: 0,
  rows: 5,
  open: false,
  edit: null,
  formValue: {
    name: "",
    email: "",
  },
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(`data:`, data);
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rows = action.payload;
      state.page = 0;
    },
    openModal: (state, action) => {
      state.open = true;
      if (action.payload) {
        // If editing, populate form values
        state.edit = action.payload.id;
        state.formValue = {
          name: action.payload.name,
          email: action.payload.email,
        };
      } else {
        // If creating, reset form values
        state.edit = null;
        state.formValue = { name: "", email: "" };
      }
    },
    closeModal: (state) => {
      state.open = false;
      state.edit = null;
      state.formValue = { name: "", email: "" };
    },
    setFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.formValue[field] = value;
    },
    createUser: (state) => {
      const newUser = {
        id: Date.now(), // Generate a unique ID
        name: state.formValue.name,
        email: state.formValue.email,
      };
      state.list.push(newUser);
      state.open = false;
      state.formValue = { name: "", email: "" };
    },
    editUser: (state) => {
      const index = state.list.findIndex((user) => user.id === state.edit);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          name: state.formValue.name,
          email: state.formValue.email,
        };
      }
      state.open = false;
      state.edit = null;
      state.formValue = { name: "", email: "" };
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Fetched users:", action.payload);
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error("Error fetching users:", action.error.message);
        state.status = "failed";
        state.list = action.error.message;
      });
  },
});

export const {
  setPage,
  setRowsPerPage,
  openModal,
  closeModal,
  setFormValue,
  createUser,
  editUser,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
