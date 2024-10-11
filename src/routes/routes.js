// src/routes/routes.js
import CallAssuranceComponent from "../Layouts/callassurance/CallAssuranceComponent";
import CallSummaryComponent from "../Layouts/callsummary/CallSummaryComponent";

const routes = [
  {
    key: "callsummary",
    route: "/callsummary",
    component: <CallSummaryComponent />,
  },
  {
    key: "callassurance",
    route: "/callassurance",
    component: <CallAssuranceComponent />,
  },
];
export default routes;
