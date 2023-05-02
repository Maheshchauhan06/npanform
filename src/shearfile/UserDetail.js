import React, { useEffect } from "react";
import classes from "./UserDetail.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../Modal/Modal";
import PrimaryButton from "../Buttons/PrimaryButton";
import TextButton from "../Buttons/TextButton";
import { DeleteForeverRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsers,
  addUsers,
  assignUser,
} from "../../modules/AdminManagement/AdminSlice";
import AddUser from "../AddUser/AddUser";

const UserDetail = ({ userName, newUser, setnewUser, setnewUserName }) => {
  const userList = useSelector((state) => state.userslist);
  const currentUser = useSelector((state) => state.currentuser);
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [edit, setedit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addGroups, setaddGroups] = useState([]);
  const [newGroups, setnewGroups] = useState([]);
  const [addRoles, setaddRoles] = useState("");
  const [newRoles, setnewRoles] = useState("");

  useEffect(() => {
    if (value === 1) {
      setValue(2);
    } else {
      setValue(1);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCreate = (userName) => {
    if (!newRoles) {
      alert("Assigne Role to User");
      return;
    }
    setnewUser(false);
    dispatch(assignUser(userName));
    dispatch(addUsers(userName));
  };

  const handleCancle = () => {
    setnewUser(false);
    dispatch(assignUser(""));
    setnewUserName("");
  };

  const handleCheckbox = (data, value) => {
    if (value === 1) {
      setaddGroups([...addGroups, data]);
    } else {
      setaddRoles(data);
    }
  };

  const handleSave = (value) => {
    setnewGroups(addGroups);
    setnewRoles(addRoles);
    setShowModal(false);
  };

  useEffect(() => {
    if (!userList.includes(userName)) {
      dispatch(assignUser(""));
    }
  }, [userList]);

  const handleDeleteUser = (userName) => {
    dispatch(deleteUsers(userName));
  };

  const allGroups = ["Group1", "Group2", "Group3"];

  const allRoles = ["Roles1", "Roles2", "Roles3"];

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={classes.sidebar_usercontainer}>
            <div className={classes.usercontainer_heading}>
              <span>{value !== 1 ? "Roles" : "Groups"}</span>
            </div>
            <div className={classes.usercontainer_searchbar}>
              <input placeholder="All Users" type="text" />
              <button>
                <SearchIcon />
              </button>
            </div>
            <div className={classes.usercontainer_userlist}>
              {/* showing all groups and roles to assigne to user */}
              {value == 1
                ? allGroups.map((data, key) => {
                    return (
                      <>
                        <label key={key}>
                          <input
                            onChange={(e) => handleCheckbox(data, value)}
                            type="checkbox"
                          />
                          <span> {data}</span>
                        </label>
                      </>
                    );
                  })
                : allRoles.map((data, key) => {
                    return (
                      <>
                        <label key={key}>
                          <input
                            checked={data === addRoles}
                            onChange={(e) => handleCheckbox(data, value)}
                            type="checkbox"
                          />
                          <span> {data} </span>
                        </label>
                      </>
                    );
                  })}
            </div>
            <div className={classes.modal_btn}>
              <PrimaryButton onClick={() => handleSave(value)} label={"Save"} />
              <PrimaryButton
                onClick={() => setShowModal(false)}
                label={"Cancle"}
              />
            </div>
          </div>
        </Modal>
      )}
      <div className={classes.usercontainer}>
        <div className={classes.usercontainer_heading}>
          <h4> Showing user {userName} </h4>
        </div>
        <div className={classes.usercontainer_icons}>
          <span className={classes.username}>
            {userName}
            {edit !== true && newUser !== true && (
              <IconButton onClick={() => setedit(true)}>
                <EditIcon />
              </IconButton>
            )}
          </span>
          <span className={classes.username}>
            <label>
              {edit == true && newUser !== true && (
                <>
                  <span>Delete User</span>
                  <IconButton onClick={() => handleDeleteUser(userName)}>
                    <DeleteForeverRounded />
                  </IconButton>
                </>
              )}
            </label>
          </span>
        </div>
        <div className={classes.userinfo_table}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
            >
              <Tab value={1} label="Groups" />
              <Tab value={2} label="Roles" />
              <Tab value={3} label="User Details" />
            </Tabs>
          </Box>
          <div className={classes.addgroups}>
            <TextButton
              className={classes.addgroup_btn}
              onClick={handleClickOpen}
              label={
                value === 1
                  ? "Assign Groups"
                  : value === 2
                  ? "Assign Roles"
                  : ""
              }
            />
          </div>
          <div className={classes.userinfo_box}>
            {/*  for new user that assign group or role to user */}
            {value !== 3 ? (
              <>
                {newUser &&
                  (value === 1 ? (
                    newGroups.map((data, key) => {
                      return (
                        <h4 key={key}>
                          {data}
                          {edit && (
                            <button className={classes.userinfo_removebtn}>
                              Remove
                            </button>
                          )}
                        </h4>
                      );
                    })
                  ) : (
                    <h4>
                      {newRoles}
                      {edit && (
                        <button className={classes.userinfo_removebtn}>
                          Remove
                        </button>
                      )}
                    </h4>
                  ))}
                {/*  group and roles of previous users */}
                {!newUser &&
                  (value == 1
                    ? allGroups.map((data, key) => {
                        return (
                          <h4 key={key}>
                            {data}
                            {edit && (
                              <button className={classes.userinfo_removebtn}>
                                Remove
                              </button>
                            )}
                          </h4>
                        );
                      })
                    : allRoles.map((data, key) => {
                        return (
                          <h4 key={key}>
                            {data}
                            {edit && (
                              <button className={classes.userinfo_removebtn}>
                                Remove
                              </button>
                            )}
                          </h4>
                        );
                      }))}
              </>
            ) : (
              <AddUser newUser={newUser} username={userName} />
            )}
          </div>
        </div>
        <div className={classes.userinfo_totalgroups}>
          {value === 1 ? (
            <span>Total {allGroups.length} Groups assigned </span>
          ) : value === 2 ? (
            <span>Total {allRoles.length} Roles assigned </span>
          ) : (
            <></>
          )}

          {edit === true && (
            <p onClick={() => setedit(false)}>
              <PrimaryButton label={"Save"} />
              <PrimaryButton label={"Cancle"} />
            </p>
          )}
          {newUser && (
            <p>
              <PrimaryButton
                onClick={() => handleCreate(userName)}
                label={"Create"}
              />
              <PrimaryButton onClick={handleCancle} label={"Cancle"} />
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
