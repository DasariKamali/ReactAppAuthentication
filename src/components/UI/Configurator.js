// src/components/UI/Configurator.js
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Configurator = () => {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, background: "#fff", padding: 10, borderRadius: 5, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <IconButton>
        <CloseIcon />
      </IconButton>
      <h3>Configurator</h3>
      <p>Configure your application settings here.</p>
    </div>
  );
};
export default Configurator;
