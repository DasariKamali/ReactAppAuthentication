// src/config/authConfig.js
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "65ded0ea-67ee-4821-866d-ec41713339c9", 
    authority: "https://login.microsoftonline.com/df1e53b3-1663-4279-8a43-f33a0b883196", 
    redirectUri: "http://localhost:3000", 
    postLogoutRedirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage", 
    storeAuthStateInCookie: false, 
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};
export const loginRequest = {
  scopes: ["User.Read"],
};
