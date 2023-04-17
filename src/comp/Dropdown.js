import React from "react";

const Dropdown = ({ name, value }) => {
  return (
    <tr>
      <td>{name} </td>
      <td colSpan="3">
        <select name={value[0]}>
          {value.map((data) => {
            return <option value={data}> {data} </option>;
          })}
        </select>
      </td>
    </tr>
  );
};

export default Dropdown;
