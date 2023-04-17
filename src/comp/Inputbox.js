import React from "react";

const Inputbox = ({ name, place }) => {
  return (
    <tr>
      <td>{name} </td>
      <td colSpan="3">
        <input placeholder={place} type="text" />
      </td>
    </tr>
  );
};

export default Inputbox;
