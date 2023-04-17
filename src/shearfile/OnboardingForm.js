import { useTranslation } from "react-i18next";
import Classes from "./OnboardingForm.module.css";
import InputBox from "../../../components/Form/InputBox";
import DropDown from "../../../components/Form/Dropdown";
import Checkbox from "../../../components/Form/Checkbox";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { submitCorpOnboardingForm } from "../FormActions";
import validateValue from "../NPSRegForm/Utils";
import Utils from "../../../Utils";

const onBoardingform = {
  nameCorporate: "",
  nameSector: "",
  nameCra: "",
  corpStatus: "",
  panNum: "",
  cinNum: "",
  gstNum: "",
  bankName: "",
  accNum: "",
  ifscNum: "",
  spocName: "",
  spocEmail: "",
  spocContact: "",
  hrName: "",
  hrEmail: "",
  hrContact: "",
  benifitsName: "",
  benifitsEmail: "",
  benifitsContact: "",
  saName: "",
  saDate: "",
  saPlace: "",
  saDesig: "",
  saDepart: "",
  hdfcName: "",
  hdfcDate: "",
  hdfcPlace: "",
  hdfcDesig: "",
  hdfcDepartment: "",
  organisationSa: "",
  headofficeLocation: "",
  subofficeLocation: "",
  groupEntity: "",
  totalEmployee: "",
  eligibleEmployee: "",
  above10Employee: "",
  newJoinemployee: "",
  newAbove10employee: "",
  newEligibleemployee: "",
  npsSubscritption: "",
  npsWindow: "",
  npsMonth: "",
  npsDate: "",
  retireDuringmonth: "",
  retireMonthend: "",
  craCharges: "",
};

const OnboardingForm = (props) => {
  useEffect(() => {
    console.log(props.corpdata)
    if (props.corpdata !== undefined) {
      const corpData = props.corpdata;
      // if (corpData.corpStatus)
      statusCorp.map((data,index) => {
        if (data === corpData.corpStatus) {
          setCorpStatus(index); 
        }
      });
      Chargesborne.map((data,index) => {
        if (data === corpData.borneCharges) {
          setPopborne(index); 
        }
      });
      Chargescycle.map((data,index) => {
        if (data === corpData.cycleCharges) {
          setPopcyle(index); 
        }
      });

      setOnboarding(corpData)
    } 
  }, []);

  const statusCorp = ["New Registration", "POP Change"];
  const NpsEnrollment = ["Monthly", "Qtr", "Half-year", "Yearly"];
  const Enrollmentmonth = ["Half-Yearly", "Yearly"];
  const Chargesborne = ["Employer", "Employee"];
  const Chargescycle = ["Monthly", "Quaterly"];

  const [Popborne, setPopborne] = useState(null);
  const [Popcyle, setPopcyle] = useState(null);
  const [corpStatus, setCorpStatus] = useState(null);

  const [onboarding, setOnboarding] = useState({
    ...onBoardingform,
    borneCharges: Chargesborne[Popborne],
    cycleCharges: Chargescycle[Popcyle],
    corpStatus: statusCorp[corpStatus],
  });

  const Sector = [
    "Advertisement",
    "Airport",
    "Architecture",
    "Automobiles",
    "Banking and Financial Services",
    "Telecommunication",
    "Manufacturing",
    "IT,BPO,KPO and Services",
    "Real Estate",
    "Agriculture",
    "Chemicals",
    "Defence",
    "E-commerce",
    "FMCG",
    "Healthcare",
    "Hospitality",
    "Pharma",
    "Oil and Gas",
    "Textile",
    "Power",
    "Others",
  ];

  const craName = ["CAMS", "KfinTech", "Protean"];

  const [showError, setShowEror] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    console.log(onboarding);
    alert('done')
    console.log(validateValue(onboarding.spocContact, "contact"));
    setOnboarding(onBoardingform);

    // submitCorpOnboardingForm(onboarding).then((response) => {
    //   if (response && response.data) {
    //     if (response.data.success) {
    //       setShowEror(false);
    //       // ALert
    //       // TODO: Add proper modal alert
    //       alert("Your details have been submitted");
    //     } else {
    //       setShowEror(true);
    //       setErrorMessage(t("corpreg.form.wrongCredentials"));
    //     }
    //   } else {
    //     setShowEror(true);
    //     setErrorMessage(t("corpreg.form.failedRequest"));
    //   }
    // });
  };

  const { t } = useTranslation();
  return (
    <div className={Classes.Onboarding_form}>
      <h2>Onboarding Form</h2>
      <table className={Classes.Onboarding_table}>
        <tbody>
          <InputBox
            value={onboarding.nameCorporate}
            name="nameCorporate"
            setvalue={setOnboarding}
            label={"Name of the Corporate*"}
          />
          <DropDown
            value={onboarding.nameSector}
            name="nameSector"
            setvalue={setOnboarding}
            label={"Name of the Corporate*"}
            options={Sector}
            select={"Sector*"}
          />
          <DropDown
            value={onboarding.nameCra}
            name="nameCra"
            setvalue={setOnboarding}
            label={"CRA Name"}
            options={craName}
            select={"CRA Name*"}
          />
          <tr>
            <td colSpan={2}>Corporate Status* :</td>
            {statusCorp.map((data, index) => {
              return (
                <td colSpan={1} key={index}>
                  <Checkbox
                    key={index}
                    value={statusCorp}
                    name="corpStatus"
                    setvalue={setOnboarding}
                    currIndex={corpStatus}
                    setcurrIndex={setCorpStatus}
                    index={index}
                    label={data}
                  />
                </td>
              );
            })}
          </tr>
          <InputBox
            value={onboarding.panNum}
            name="panNum"
            setvalue={setOnboarding}
            label={"Pan Number*"}
          />
          <InputBox
            value={onboarding.cinNum}
            name="cinNum"
            setvalue={setOnboarding}
            label={"CIN Number*"}
          />
          <InputBox
            value={onboarding.gstNum}
            name="gstNum"
            setvalue={setOnboarding}
            label={"GST*"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                Bank details of Corporate
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.bankName}
            name="bankName"
            setvalue={setOnboarding}
            label={"1. Bank Name*"}
          />
          <InputBox
            value={onboarding.accNum}
            name="accNum"
            setvalue={setOnboarding}
            label={"2. Account Number*"}
          />
          <InputBox
            value={onboarding.ifscNum}
            name="ifscNum"
            setvalue={setOnboarding}
            label={"3. IFSC Number*"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>SPOC for Corporate</h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.spocName}
            name="spocName"
            setvalue={setOnboarding}
            label={"1. Name"}
          />
          <InputBox
            req={true}
            value={onboarding.spocEmail}
            name="spocEmail"
            setvalue={setOnboarding}
            label={"2. Email Id"}
            type={'email'}
          />
          <InputBox
            value={onboarding.spocContact}
            name="spocContact"
            setvalue={setOnboarding}
            label={"3. Contact Number"}
            type={'contact'}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>Head HR Details:</h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.hrName}
            name="hrName"
            setvalue={setOnboarding}
            label={"1. Name"}
          />
          <InputBox
            value={onboarding.hrEmail}
            name="hrEmail"
            setvalue={setOnboarding}
            label={"2. Email Id"}
          />
          <InputBox
            value={onboarding.hrContact}
            name="hrContact"
            setvalue={setOnboarding}
            label={"3. Contact Number"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                Compensation and Benefits Head Details
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.benifitsName}
            name="benifitsName"
            setvalue={setOnboarding}
            label={"1. Name"}
          />
          <InputBox
            value={onboarding.benifitsEmail}
            name="benifitsEmail"
            setvalue={setOnboarding}
            label={"2. Email Id"}
          />
          <InputBox
            value={onboarding.benifitsContact}
            name="benifitsContact"
            setvalue={setOnboarding}
            label={"3. Contact Number"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                Sigining Authority : Corporate
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.saName}
            name="saName"
            setvalue={setOnboarding}
            label={"1. Name"}
          />
          <InputBox
            type={"date"}
            value={onboarding.saDate}
            name="saDate"
            setvalue={setOnboarding}
            label={"2. Date"}
          />
          <InputBox
            value={onboarding.saPlace}
            name="saPlace"
            setvalue={setOnboarding}
            label={"3. Place"}
          />
          <InputBox
            value={onboarding.saDesig}
            name="saDesig"
            setvalue={setOnboarding}
            label={"4. Designation"}
          />
          <InputBox
            value={onboarding.saDepart}
            name="saDepart"
            setvalue={setOnboarding}
            label={"5. Department"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                Sigining Authority : HDFC Pension
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.hdfcName}
            name="hdfcName"
            setvalue={setOnboarding}
            label={"1. Name"}
          />
          <InputBox
            type={"date"}
            value={onboarding.hdfcDate}
            name="hdfcDate"
            setvalue={setOnboarding}
            label={"2. Date"}
          />
          <InputBox
            value={onboarding.hdfcPlace}
            name="hdfcPlace"
            setvalue={setOnboarding}
            label={"3. Place"}
          />
          <InputBox
            value={onboarding.hdfcDesig}
            name="hdfcDesig"
            setvalue={setOnboarding}
            label={"4. Designation"}
          />
          <InputBox
            value={onboarding.hdfcDepartment}
            name="hdfcDepartment"
            setvalue={setOnboarding}
            label={"5. Department"}
          />
          <InputBox
            value={onboarding.organisationSa}
            name="organisationSa"
            setvalue={setOnboarding}
            label={"Compensation and Besnefits in the organisation (SA,etc)"}
          />
          <InputBox
            value={onboarding.headofficeLocation}
            name="headofficeLocation"
            setvalue={setOnboarding}
            label={"Corporate Head office location*"}
          />
          <InputBox
            value={onboarding.subofficeLocation}
            name="subofficeLocation"
            setvalue={setOnboarding}
            label={"Corporate Sub offices locations"}
          />
          <InputBox
            value={onboarding.groupEntity}
            name="groupEntity"
            setvalue={setOnboarding}
            label={" Group Entity"}
          />
          <InputBox
            value={onboarding.totalEmployee}
            name="totalEmployee"
            setvalue={setOnboarding}
            type={"number"}
            label={"1. Total Number of Emplyoees"}
          />
          <InputBox
            value={onboarding.eligibleEmployee}
            name="eligibleEmployee"
            setvalue={setOnboarding}
            type={"number"}
            label={"2. Total no of eligible employee for NPS option"}
          />
          <InputBox
            value={onboarding.above10Employee}
            name="above10Employee"
            setvalue={setOnboarding}
            type={"number"}
            label={"3. Number of Employees above 10 lakhs"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                New Joiner detail for the year
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.newJoinemployee}
            name="newJoinemployee"
            setvalue={setOnboarding}
            type={"number"}
            label={
              "1. Number of expected new joining employee in particular Year"
            }
          />
          <InputBox
            value={onboarding.newAbove10employee}
            name="newAbove10employee"
            setvalue={setOnboarding}
            type={"number"}
            label={"2. Above 10 lakh employee"}
          />
          <InputBox
            value={onboarding.newEligibleemployee}
            name="newEligibleemployee"
            setvalue={setOnboarding}
            type={"number"}
            label={"3. Expected total no of eligible employee for NPS option"}
          />
          <InputBox
            value={onboarding.npsSubscritption}
            name="npsSubscritption"
            setvalue={setOnboarding}
            label={"NPS Subscription(Man/Vol)"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                NPS Registration window
              </h4>
            </td>
          </tr>
          <DropDown
            value={onboarding.npsWindow}
            name="npsWindow"
            setvalue={setOnboarding}
            select={
              "NPS Enorollment window (Monthly / Qtr / Half-Yearly / Yearly)"
            }
            options={NpsEnrollment}
          />
          <DropDown
            value={onboarding.npsMonth}
            name="npsMonth"
            setvalue={setOnboarding}
            select={
              "NPS Enrollment Month (In case of Qtr, Half-yearly and Yearly) "
            }
            options={Enrollmentmonth}
          />
          <InputBox
            type={"date"}
            value={onboarding.npsDate}
            name="npsDate"
            setvalue={setOnboarding}
            label={"NPS Window Open Date"}
          />
          <tr>
            <td colSpan={4}>
              <h4 className={Classes.Onboard_heading}>
                Retirement Age (In Years) (Only one Selection in below options)
              </h4>
            </td>
          </tr>
          <InputBox
            value={onboarding.retireDuringmonth}
            name="retireDuringmonth"
            setvalue={setOnboarding}
            disabled={onboarding.retireMonthend}
            type={"number"}
            label={"A. Retirement during the month"}
          />
          <InputBox
            value={onboarding.retireMonthend}
            name="retireMonthend"
            setvalue={setOnboarding}
            disabled={onboarding.retireDuringmonth}
            type={"number"}
            label={"B. Retirement at the month end"}
          />
          <InputBox
            value={onboarding.craCharges}
            name="craCharges"
            type={"number"}
            setvalue={setOnboarding}
            label={"CRA Charges"}
          />

          <tr>
            <td colSpan={2}>POP Charges to be borne by* :</td>
            {Chargesborne.map((data, index) => {
              return (
                <td key={index} colSpan={1}>
                  <Checkbox
                    key={index}
                    value={Chargesborne}
                    name="borneCharges"
                    setvalue={setOnboarding}
                    currIndex={Popborne}
                    setcurrIndex={setPopborne}
                    index={index}
                    label={data}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2}>POP Charges deduction cycle* :</td>
            {Chargescycle.map((data, index) => {
              return (
                <td key={index} colSpan={1}>
                  <Checkbox
                    key={index}
                    value={Chargescycle}
                    name="cycleCharges"
                    setvalue={setOnboarding}
                    currIndex={Popcyle}
                    setcurrIndex={setPopcyle}
                    index={index}
                    label={data}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div className={Classes.submitbtn}>
        <button
          // style={{ display: "none" }}
          onClick={handleSubmit}
          type="button"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OnboardingForm;
