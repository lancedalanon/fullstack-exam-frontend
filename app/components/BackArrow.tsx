"use client";
import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackArrowProps {
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

const BackArrow: React.FC<BackArrowProps> = ({ onClick, size = "medium" }) => {
  let iconSize: number;

  // Set icon size based on the prop
  switch (size) {
    case "small":
      iconSize = 20;
      break;
    case "medium":
      iconSize = 30;
      break;
    case "large":
      iconSize = 40;
      break;
    default:
      iconSize = 30;
  }

  return (
    <IconButton
      onClick={onClick}
      color="primary"
      sx={{
        fontSize: iconSize, // Control the icon size
      }}
    >
      <ArrowBackIcon fontSize="inherit" />
    </IconButton>
  );
};

export default BackArrow;
