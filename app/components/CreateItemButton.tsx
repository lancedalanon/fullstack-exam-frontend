"use client";
import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "../hooks/useNavigate";

export default function CreateItemButton() {
  const { navigateTo } = useNavigate();

  const handleClick = () => {
    navigateTo("/create-item");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      sx={{
        mt: 2,
        borderRadius: "20px",
        height: "50px",
        py: 2,
      }}
      onClick={handleClick}
    >
      Create Item
    </Button>
  );
}
