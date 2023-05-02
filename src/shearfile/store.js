import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./App/modules/Users/UsersSlice";
import tasksReducer from "./App/modules/Tasks/TasksSlice";
import rootReducer, {
  grouplistReducer,
  rolelistReducer,
  userslistReducer,
  currentUserReducer,
  userTabValueReducer,
} from "./App/modules/AdminManagement/AdminSlice";

// Configure our store combining all the state reducers.
export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    userslist: userslistReducer,
    groupslist: grouplistReducer,
    roleslist: rolelistReducer,
    currentuser: currentUserReducer,
    currentTab: userTabValueReducer,
  },
});
