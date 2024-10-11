// src/layouts/callassurance/CallAssuranceComponent.js
import React, { useContext } from "react";
import { GlobalStateContext } from "../../contexts/GlobalStateContext";
import MDBox from "../../components/UI/MDBox";
import MDTypography from "../../components/UI/MDTypography";

const CallAssuranceComponent = () => {
  const { stateObj } = useContext(GlobalStateContext);

  return (
    <MDBox>
      <MDTypography variant="h3">Call Assurance</MDTypography>
      <MDTypography>Welcome, {stateObj.email}</MDTypography>
      {/* Add more content as needed */}
    </MDBox>
  );
};

export default CallAssuranceComponent;
