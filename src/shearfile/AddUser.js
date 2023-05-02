import React, { useEffect } from "react";
import classes from "./AddUser.module.css";
import Password from "../Password/Password";
import { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../../modules/AdminManagement/AdminSlice";

const inputValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  emailId: "",
  enterPassword: "",
  confirmPassword: "",
};

const AddUser = ({ setnewUserName, setnewUser, username, newUser }) => {
  const users = useSelector((state) => state.userslist);
  const dispatch = useDispatch();
  const [newUserinput, setnewUserinput] = useState({
    ...inputValues,
  });

  useEffect(() => {
    if (username) {
      setnewUserinput((data) => ({
        ...data,
        firstName: username,
      }));
    }
    // if (emailId) {
    //   setnewUserinput((data) => ({
    //     ...data,
    //     emailId: emailId,
    //   }));
    // }
  }, []);

  const handleNewuser = (e) => {
    e.preventDefault();
    if (newUserinput.confirmPassword !== newUserinput.enterPassword) {
      alert("Password Not Matched");
      return;
    }
    setnewUserName(newUserinput.firstName);
    if (users.includes(newUserinput.firstName)) {
      alert("user exits");
      dispatch(assignUser(newUserinput.firstName));
      setnewUser(false);
    }
    console.log(newUserinput);
    setnewUserinput("");
  };

  return (
    <form onSubmit={handleNewuser} className={classes.usercontainer}>
      <div className={classes.inputcontainer}>
        <div className={classes.adminform_input}>
          <p> First Name* </p>
          <input
            required
            value={newUserinput.firstName}
            onChange={(e) => {
              setnewUserinput((data) => ({
                ...data,
                firstName: e.target.value,
              }));
            }}
            type="text"
          />
        </div>
        <div className={classes.adminform_input}>
          <p> Middle Name </p>
          <input
            value={newUserinput.middleName}
            onChange={(e) => {
              setnewUserinput((data) => ({
                ...data,
                middleName: e.target.value,
              }));
            }}
            type="text"
          />
        </div>
        <div className={classes.adminform_input}>
          <p> Last Name </p>
          <input
            value={newUserinput.lastName}
            onChange={(e) => {
              setnewUserinput((data) => ({
                ...data,
                lastName: e.target.value,
              }));
            }}
            type="text"
          />
        </div>
        <div className={classes.adminform_input}>
          <p> Email Id* </p>
          <input
            required
            value={newUserinput.emailId}
            onChange={(e) => {
              setnewUserinput((data) => ({
                ...data,
                emailId: e.target.value,
              }));
            }}
            type="text"
          />
        </div>
        <div className={classes.adminform_input}>
          <p> Enter Password* </p>
          <span className={classes.adminform_input_password}>
            <Password
              req={true}
              onChange={(e) =>
                setnewUserinput((data) => ({
                  ...data,
                  enterPassword: e.target.value,
                }))
              }
              togglePasswordVisibility
              width={"100%"}
            />
          </span>
        </div>
        <div className={classes.adminform_input}>
          <p> Confirm Password* </p>
          <span className={classes.adminform_input_password}>
            <Password
              req={true}
              onChange={(e) =>
                setnewUserinput((data) => ({
                  ...data,
                  confirmPassword: e.target.value,
                }))
              }
              togglePasswordVisibility
              width={"100%"}
            />
          </span>
        </div>
        {newUser && <PrimaryButton type="submit" label={"Next"} />}
      </div>
    </form>
  );
};

export default AddUser;
