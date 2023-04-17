import React from "react";
import Dropdown from "./comp/Dropdown";
import Inputbox from "./comp/Inputbox";
import "./Form.css";

const Form = () => {
  const Salutation = ["Shri", "Smt", "Kumari"];
  const selctvalue = ["Father's name", "Mother's Name"];
  const Gender = ["Male", "Female", "Transgender"];
  const Marital = ["Unmarried", "Married", "Window/Widower", "Divorcee"];
  const income = [
    "Below 1 lac",
    "1 lac to 5 lac",
    "5 lac to 10 lac",
    "10 lac to 25 lac",
    "25 lac to 1 Cr",
    "Above 1 Cr",
  ];

  const Occup = [
    "Public Sector",
    "Private Sector",
    "Professona",
    "Self Employed",
    "Homemker",
    "Other",
  ];

  const Political = [
    "Politicaly exposed person",
    "Related to Politicaly exposed person",
  ];

  return (
    <form className="form_container" action="">
      <table className="table">
        <tbody>
          <tr>
            <td>CKYC identifier</td>
            <td>
              <input type="text" />
            </td>
            <td>RA Code</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <p>
                1. PERSONAL DETAILS: (Refer Sr.No. 1 of the instructions) Use
              </p>
            </td>
          </tr>
          <Dropdown name={"Salutation*"} value={Salutation} />
          <Inputbox name="Applicant Name*" />
          <Inputbox name="Father's Name" />
          <Inputbox name="Mother's Name" />
          <Dropdown
            name="Either Father's or Mother's name is Mandatory*"
            value={selctvalue}
          />
          <Inputbox name="Date of Birth*" />
          <Inputbox name="Place of Birth*" />
          <Inputbox name="Country of Birth*" />
          <Dropdown name={"Gender"} value={Gender} />
          <Dropdown name={"Marital Status"} value={Marital} />
          <Inputbox name={"Spouse Name* (if married)"} />
          <Inputbox name={"PAN*"} />
          <Dropdown name={"Income Range (per annum)"} value={income} />
          <Dropdown name={"Occupation Details"} value={Occup} />
          <Dropdown name={"Plese Tick if Applicable"} value={Political} />
        </tbody>
        <tbody>
          <tr>
            <td colSpan="4">
              <p>
                2. PROOF OF IDENTITY AND ADDRESS* (Refer Sr. No. 2 of the
                instructions)
              </p>
            </td>
          </tr>
          <Inputbox name={"Passport"} />
          <Inputbox name={"Passport Expiry Date"} />
          <Inputbox name={"Driving License"} />
          <Inputbox name={"Driving License Expiry Date"} />
          <Inputbox name={"Voter ID Card"} />
          <Inputbox
            place={"Provide last four digits"}
            name={"Proof of possession of Aadhaar"}
          />
        </tbody>
      </table>
    </form>
  );
};

export default Form;
