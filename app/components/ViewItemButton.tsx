"use client";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

interface ViewItemButtonProps {
  id: number | string | null | undefined;
}

const ViewItemButton: React.FC<ViewItemButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/item/${id}`);
  };

  return (
    <IconButton color="primary" onClick={handleView}>
      <VisibilityIcon />
    </IconButton>
  );
};

export default ViewItemButton;
