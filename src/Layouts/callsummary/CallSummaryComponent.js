// src/layouts/callsummary/CallSummaryComponent.js
import React, { useContext } from "react";
import { GlobalStateContext } from "../../contexts/GlobalStateContext";
import MDBox from "../../components/UI/MDBox";
import MDTypography from "../../components/UI/MDTypography";

const CallSummaryComponent = () => {
  const { stateObj } = useContext(GlobalStateContext);
  return (
    <MDBox>
      <MDTypography variant="h3">Call Summary</MDTypography>
      <MDTypography>Welcome, {stateObj.email}</MDTypography>
      {}
    </MDBox>
  );
};
export default CallSummaryComponent;
