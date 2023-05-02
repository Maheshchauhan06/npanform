import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./Sidebar.module.css";
import TextButton from "../Buttons/TextButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import {
  deleteGroups,
  deleteRoles,
  userTabValue,
  assignUser,
} from "../../modules/AdminManagement/AdminSlice";

const Sidebar = ({ setnewUser, dataList }) => {
  const [searchUser, setsearchUser] = useState("");
  const [filterUser, setfilterUser] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentTab = useSelector((state) => state.currentTab);

  const handleChange = (e, newValue) => {
    dispatch(userTabValue(newValue));
  };

  useEffect(() => {
    if (searchUser !== "") {
      setfilterUser(
        dataList.filter((data) => {
          return data
            .toLocaleLowerCase()
            .includes(searchUser.toLocaleLowerCase());
        })
      );
    } else {
      setfilterUser(dataList);
    }
  }, [searchUser, dataList]);

  const handleNewuser = () => {
    setnewUser(true);
    dispatch(assignUser(""));
  };

  const handleOlduser = (user) => {
    setnewUser(false);
    dispatch(assignUser(user));
  };

  const handleDeleteGroup = (group) => {
    dispatch(deleteGroups(group));
  };

  const handleDeleteRoles = (role) => {
    dispatch(deleteRoles(role));
  };

  return (
    <div className={classes.sidebar}>
      {/* Roles Groups and Users*/}
      <h5>Users</h5>
      <div className={classes.sidebar_usercontainer}>
        <div className={classes.usercontainer_heading}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              aria-label="secondary tabs example"
            >
              <Tab sx={{ width: "30%" }} key={1} value={1} label="Users" />
              <Tab sx={{ width: "30%" }} key={2} value={2} label="Groups" />
              <Tab sx={{ width: "30%" }} key={3} value={3} label="Roles" />
            </Tabs>
          </Box>
        </div>
        <span>
          <TextButton
            onClick={handleNewuser}
            label={
              currentTab === 1
                ? "New user+"
                : currentTab === 2
                ? "New Group+"
                : "New Roles+"
            }
          />
        </span>
        <div className={classes.usercontainer_searchbar}>
          <input
            value={searchUser}
            onChange={(e) => setsearchUser(e.target.value)}
            placeholder={
              currentTab === 1
                ? "Search Users"
                : currentTab === 2
                ? "Search Groups"
                : "Search Roles"
            }
            type="text"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        {currentTab === 1 ? (
          <div className={classes.usercontainer_userlist}>
            {filterUser.map((user, key) => {
              return (
                <h4 onClick={() => handleOlduser(user)} key={key}>
                  {user}
                </h4>
              );
            })}
          </div>
        ) : currentTab === 2 ? (
          <>
            <div className={classes.usercontainer_userlist}>
              {filterUser.map((user, key) => {
                return (
                  <h4 key={key}>
                    {user}
                    <PrimaryButton
                      onClick={() => handleDeleteGroup(user)}
                      label={"Delete"}
                    />
                  </h4>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className={classes.usercontainer_userlist}>
              {filterUser.map((user, key) => {
                return (
                  <h4 key={key}>
                    {user}
                    <PrimaryButton
                      onClick={() => handleDeleteRoles(user)}
                      label={"Delete"}
                    />
                  </h4>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className={classes.total_users}>
        <h2> Total : {filterUser.length} </h2>
      </div>
    </div>
  );
};

export default Sidebar;
