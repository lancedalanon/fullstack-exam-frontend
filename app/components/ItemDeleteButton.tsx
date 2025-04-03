"use client";
import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ItemDeleteButtonProps {
  onDelete: () => void;
}

const ItemDeleteButton: React.FC<ItemDeleteButtonProps> = ({ onDelete }) => {
  return (
    <IconButton
      color="error"
      onClick={onDelete}
      sx={{
        fontSize: "2rem",
        height: "40px",
        width: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DeleteIcon sx={{ fontSize: "inherit" }} />
    </IconButton>
  );
};

export default ItemDeleteButton;
