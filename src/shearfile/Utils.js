import React from "react";
import i18n from "../i18n/i18n";
import MessageDialog from "./components/MessageDialog/MessageDialog";
import Consts from "./Consts";

const adminPermissions = [
  Consts.PERMISSIONS_JIG,
  Consts.PERMISSIONS_PRINT_LAYOUT,
  Consts.PERMISSIONS_AUTOMATION_RULES,
  Consts.PERMISSIONS_USER_MANAGEMENT,
  Consts.PERMISSIONS_MASTERS,
  Consts.PERMISSIONS_INPUT_SETTINGS,
  Consts.PERMISSIONS_OUTPUT_SETTINGS,
  Consts.PERMISSIONS_CONFIGURATION,
  Consts.PERMISSIONS_DELETE_ORDERS,
  Consts.PERMISSIONS_DOWNLOADS,
  Consts.PERMISSIONS_CHANGE_ORDER_JIG,
  Consts.PERMISSIONS_CHANGE_ORDER_ASSIGNEE,
  Consts.PERMISSIONS_OUTPUT_PRESET,
];

const powerPermissions = [
  Consts.PERMISSIONS_JIG,
  Consts.PERMISSIONS_PRINT_LAYOUT,
  Consts.PERMISSIONS_AUTOMATION_RULES,
  Consts.PERMISSIONS_MASTERS,
  Consts.PERMISSIONS_INPUT_SETTINGS,
  Consts.PERMISSIONS_OUTPUT_SETTINGS,
  Consts.PERMISSIONS_CONFIGURATION,
  Consts.PERMISSIONS_DOWNLOADS,
  Consts.PERMISSIONS_CHANGE_ORDER_JIG,
  Consts.PERMISSIONS_PRINT_ORDER,
];

const operatorPermissions = [
  Consts.PERMISSIONS_JIG,
  Consts.PERMISSIONS_PRINT_LAYOUT,
  Consts.PERMISSIONS_OUTPUT_SETTINGS,
  Consts.PERMISSIONS_CONFIGURATION,
  Consts.PERMISSIONS_DOWNLOADS,
  Consts.PERMISSIONS_CHANGE_ORDER_JIG,
  Consts.PERMISSIONS_PRINT_ORDER,
];

const Utils = {
  containsIgnoreCase: (string, search) => {
    return string.search(new RegExp(search, "i")) !== -1;
  },

  showErrorDialog: (errorMessage, closeHandler) => {
    return (
      <MessageDialog
        message={errorMessage}
        title={i18n.t("label.error")}
        btnLabel={i18n.t("button.ok")}
        onClose={closeHandler}
        width="15rem"
        height="5rem"
      />
    );
  },
  showSuccessDialog: (errorMessage, closeHandler) => {
    return (
      <MessageDialog
        message={errorMessage}
        title={i18n.t("label.success")}
        btnLabel={i18n.t("button.ok")}
        onClose={closeHandler}
        width="15rem"
        height="5rem"
      />
    );
  },

  getCopyName: (allNames, name) => {
    // Already unique.
    if (!allNames.get(name)) {
      return name;
    }

    if (allNames.get(name + " copy")) {
      // Try generating copy (1), copy (2) etc.
      let i = 1;
      while (allNames.get(name + " copy (" + i + ")")) {
        i++;
      }
      return name + " copy (" + i + ")";
    } else {
      return name + " copy";
    }
  },

  inputPrevent: (e) => {
    const invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  },

  readFileAsText: (file) => {
    return new Promise(function (acc, rej) {
      let reader = new FileReader();
      reader.onload = function () {
        acc(reader.result);
      };
      reader.onerror = function (e) {
        rej("failed to load file");
      };
      reader.readAsText(file);
    });
  },

  validateEmail: (email) => {
    let obj = {
      valid: true,
      message: "",
    };

    let validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validEmail)) {
      obj.valid = false;
      obj.message = "Your email is not valid";
      return obj;
    }
    return obj;
  },

  validatePan : (pan)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validatePan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if(!pan.match(validatePan)){
       obj.valid = false;
       obj.message = "Your pan is not valid"
       return obj
    } return obj
  },

  validateContact : (contact)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validateContact = /^[0-9]{10}$/;
    if(!contact.match(validateContact)){
       obj.valid = false;
       obj.message = "Your Contact is not valid"
       return obj
    } return obj
  },

  validateIFSC : (ifsc)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validateIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if(!ifsc.match(validateIFSC)){
       obj.valid = false;
       obj.message = "Your IFSC NUMBER  is not valid"
       return obj
    } return obj
  },

  validateCIN : (cin)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validateCIN =  /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
    if(!cin.match(validateCIN)){
       obj.valid = false;
       obj.message = "Your CIN NUMBER  is not valid"
       return obj
    } return obj
  },

  validateAccount : (acc)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validateAccount =  /^[0-9]{9,18}$/;
    if(!acc.match(validateAccount)){
       obj.valid = false;
       obj.message = "Your CIN NUMBER  is not valid"
       return obj
    } return obj
  },

  validateGST : (gst)=>{
    let obj ={
      valid : true,
      message : "",
    };
    let validateGST =  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if(!gst.match(validateGST)){
       obj.valid = false;
       obj.message = "Your CIN NUMBER  is not valid"
       return obj
    } return obj
  },




  getLocalTimezoneOffset: () => {
    // Get local timezone offset from UTC.
    return new Date().getTimezoneOffset();
  },

  getDateString: (date, fullDateString) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getYear() + 1900;
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    if (fullDateString) {
      return dd + "_" + mm + "_" + yyyy + "_" + hh + "_" + min + "_" + ss;
    }

    return dd + "-" + mm + "-" + yyyy + " " + hh + ":" + min;
  },

  getLocalDate: (serverDate) => {
    // Get the server date as local formatted date.
    let localDate = new Date(serverDate["$date"]);
    return Utils.getDateString(localDate);
  },

  timeWithOffset: (timeInMinutes, offset) => {
    timeInMinutes = parseInt(timeInMinutes);
    offset = parseInt(offset);
    timeInMinutes += offset;
    if (timeInMinutes < 0) {
      timeInMinutes += 1440;
    }
    timeInMinutes %= 1440;

    return timeInMinutes;
  },

  convertTimeInMinutesToHHMM: (timeInMinutes) => {
    if (!timeInMinutes) return "00:00";

    let hours = parseInt(timeInMinutes / 60);
    let minutes = parseInt(timeInMinutes % 60);

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    const timeInHHMM = hours + ":" + minutes;

    return timeInHHMM;
  },

  convertTimeInHHMMToMinutes: (timeInHHMM) => {
    if (!timeInHHMM || !timeInHHMM.includes(":")) {
      return "";
    }
    const array = timeInHHMM.split(":");
    let hours = array[0];
    let minutes = array[1];
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    const timeInMinutes = hours * 60 + minutes;
    return timeInMinutes;
  },

  getLocalTime: (timeInMinutes) => {
    let offset = Utils.getLocalTimezoneOffset();
    const time = Utils.timeWithOffset(timeInMinutes, -offset);

    return Utils.convertTimeInMinutesToHHMM(time);
  },

  getUTCTime: (timeInHHMM) => {
    let timeInMinutes = Utils.convertTimeInHHMMToMinutes(timeInHHMM);
    let offset = Utils.getLocalTimezoneOffset();
    return Utils.timeWithOffset(timeInMinutes, offset);
  },
};

export default Utils;
