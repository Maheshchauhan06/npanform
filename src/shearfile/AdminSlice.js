import { createSlice } from "@reduxjs/toolkit";

export const UserListSlice = createSlice({
  name: "User",
  initialState: [
    "jack",
    "john",
    "katy",
    "kieserver",
    "krisv",
    "maciek",
    "mary",
    "salaboy",
    "jack",
    "john",
    "katy",
    "kieserver",
    "krisv",
    "maciek",
    "mary",
    "salaboy",
    "sales-rep",
    "wbadmin",
  ],
  reducers: {
    addUsers(state, action) {
      return [...state, action.payload];
    },
    deleteUsers(state, action) {
      return state.filter((user) => user !== action.payload);
    },
  },
});

export const GroupListSlice = createSlice({
  name: "Groups",
  initialState: ["Group1", "Goupr2", "Group3"],
  reducers: {
    addGroups(state, action) {
      return [...state, action.payload];
    },
    deleteGroups(state, action) {
      return state.filter((group) => group !== action.payload);
    },
  },
});

export const RoleListSlice = createSlice({
  name: "Roles",
  initialState: ["Role1", "Role2", "Role3"],
  reducers: {
    addRoles(state, action) {
      return [...state, action.payload];
    },
    deleteRoles(state, action) {
      return state.filter((role) => role !== action.payload);
    },
  },
});

export const CurrentUser = createSlice({
  name: "currentUser",
  initialState: "",
  reducers: {
    assignUser: (state, action) => {
      return action.payload;
    },
  },
});

export const UsersTabValue = createSlice({
  name: "usersTabValue",
  initialState: 1,
  reducers: {
    userTabValue: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUsers, deleteUsers } = UserListSlice.actions;
export const { addGroups, deleteGroups } = GroupListSlice.actions;
export const { addRoles, deleteRoles } = RoleListSlice.actions;
export const { assignUser } = CurrentUser.actions;
export const { userTabValue } = UsersTabValue.actions;

export const currentUserReducer = CurrentUser.reducer;
export const userslistReducer = UserListSlice.reducer;
export const grouplistReducer = GroupListSlice.reducer;
export const rolelistReducer = RoleListSlice.reducer;
export const userTabValueReducer = UsersTabValue.reducer;
