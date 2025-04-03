"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";

interface ToastContextType {
  showToast: (message: string, severity: "success" | "error", duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [duration, setDuration] = useState(5000);

  const showToast = (msg: string, sev: "success" | "error", dur = 5000) => {
    setMessage(msg);
    setSeverity(sev);
    setDuration(dur);
    setOpen(true);
  };

  // Corrected handleClose function with precise types
  const handleClose = (
    event: React.SyntheticEvent<Element, Event> | Event, // Explicitly typed event
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
