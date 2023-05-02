import Sidebar from "../../components/Sidebar/Sidebar";
import classes from "./Admin.module.css";
import UserDetail from "../../components/UserDetail/UserDetail";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import AddUser from "../../components/AddUser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { addRoles, addGroups, assignUser } from "./AdminSlice";

function Admin({ activeTab, match: { url } }) {
  const userList = useSelector((state) => state.userslist);
  const groupsList = useSelector((state) => state.groupslist);
  const rolesList = useSelector((state) => state.roleslist);
  const currentUser = useSelector((state) => state.currentuser);
  const currentTab = useSelector((state) => state.currentTab);

  const dispatch = useDispatch();
  const [newUser, setnewUser] = useState(false);
  const [newUserName, setnewUserName] = useState("");
  const [newGroupInput, setNewGroupInput] = useState("");
  const [dataList, setdataList] = useState([userList]);

  useEffect(() => {
    if (currentTab === 1) {
      setdataList(userList);
    } else if (currentTab === 2) {
      setdataList(groupsList);
    } else {
      setdataList(rolesList);
    }
    setnewUser(false);
  }, [currentTab]);

  useEffect(() => {
    if (currentUser) setnewUserName("");
    if (!userList.includes(currentUser)) {
      dispatch(assignUser(""));
    }
  }, [currentUser]);

  const handleCreateGroup = (currentTab) => {
    if (currentTab == 2) {
      setdataList([groupsList]);
      dispatch(addGroups(newGroupInput));
    } else if (currentTab == 3) {
      setdataList([rolesList]);
      dispatch(addRoles(newGroupInput));
    }
    setNewGroupInput("");
  };

  const handleCancleGroup = () => {
    setNewGroupInput("");
    setnewUser(false);
  };

  return (
    <div className={classes.admincontainer}>
      {/* side bar including roles users and group */}
      {/* Add a new component Sidebar.js */}
      <Sidebar
        setnewUser={setnewUser}
        dataList={dataList}
        setdataList={setdataList}
      />
      {/* screen to call api whenever clicked on a user is clicked */}
      {currentUser !== "" && currentTab === 1 && (
        <UserDetail userName={currentUser} />
      )}
      {newUser && currentTab === 1 && (
        <>
          {newUserName === "" ? (
            <>
              <div className={classes.usercontainer}>
                <div className={classes.usercontainer_heading}>
                  <h4> Creat New currentUser </h4>
                </div>
                <div className={classes.inputcontainer}>
                  <h4>Please introduce the user Details</h4>
                </div>
                <AddUser
                  setnewUser={setnewUser}
                  setnewUserName={setnewUserName}
                  newUser={newUser}
                />
              </div>
            </>
          ) : (
            <UserDetail
              setnewUser={setnewUser}
              newUser={newUser}
              userName={newUserName}
              setnewUserName={setnewUserName}
            />
          )}
        </>
      )}

      {newUser && currentTab !== 1 && (
        <>
          <div className={classes.group_inputcontainer}>
            <div className={classes.group_input}>
              <p>{currentTab === 2 ? "Group Name*" : "Role Name*"} </p>
              <input
                value={newGroupInput}
                onChange={(e) => setNewGroupInput(e.target.value)}
                type="text"
              />
            </div>
            <PrimaryButton
              onClick={() => handleCreateGroup(currentTab)}
              label={
                currentTab === 2
                  ? "Add Group"
                  : currentTab === 3
                  ? "Add Roles"
                  : ""
              }
            />
            <PrimaryButton
              onClick={handleCancleGroup}
              style={{ marginLeft: "1rem" }}
              label={"Cancle"}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
