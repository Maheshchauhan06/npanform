import React from "react";
import { useState } from "react";
import Utils from "../../Utils";

const InputBox = ({
  name,
  type,
  place,
  max,
  req,
  value,
  setvalue,
  disabled,
  label,
}) => {

   const [inputCheck, setinputCheck] = useState(null)

  const handleOnchange = (e) => {
    setvalue((data) => ({
      ...data,
      [name]: e.target.value,
    }));
  };

  const handlevalid = (e)=>{
    switch (type){
       case "email" : {
        setinputCheck( Utils.validateEmail(e.target.value).valid )
         break;
       }
       case "pan" : {
        setinputCheck( Utils.validatePan(e.target.value).valid )
         break;
       }
       case "contact" : {
        setinputCheck( Utils.validateContact(e.target.value).valid )
         break;
       }
       case "acc" : {
        setinputCheck( Utils.validateAccount(e.target.value).valid )
         break;
       }
       case "ifsc" : {
        setinputCheck( Utils.validateIFSC(e.target.value).valid )
         break;
       }


       default :  break;
    }
  }

  return (
    <tr>
      <td colSpan={2}>{label}</td>
      <td colSpan={2}>
        <input onBlur={ handlevalid  }
          disabled={disabled}
          onChange={handleOnchange}
          placeholder={place}
          type={type}
          value={value}
          maxLength={max}
          style={{ borderColor: inputCheck ===null ? 'lightgray' : (inputCheck  ? '#27E1C1' : '#FF6D60') }}
        />
      </td>
    </tr>
  );
};

export default InputBox;
