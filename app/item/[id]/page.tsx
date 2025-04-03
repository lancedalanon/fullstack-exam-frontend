"use client";
import * as React from "react";
import { useAuthProtection } from "../../hooks/useAuthProtection";
import LogoutButton from "../../components/LogoutButton";
import { Box, CircularProgress } from "@mui/material";
import EditableItemForm from "../../components/EditableItemForm";
import { useNavigate } from "../../hooks/useNavigate";
import BackArrow from "../../components/BackArrow";
import { useParams } from "next/navigation";
import { useFetchItem } from "../../hooks/items/useFetchItem";
import { useUpdateItem } from "../../hooks/items/useUpdateItem";
import { useDeleteItem } from "../../hooks/items/useDeleteItem";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import { useToast } from "../../contexts/toastContext";
import { useRouter } from "next/navigation";
import { EditableItemFormInputs } from "../../../schemas/item/EditItemFormSchema";

export default function ViewItem() {
  useAuthProtection();

  const { id } = useParams();
  const { navigateTo } = useNavigate();
  const router = useRouter();
  const { item, loading, error } = useFetchItem(id?.toString());
  const { updateItem } = useUpdateItem();
  const { deleteItem } = useDeleteItem();
  const { showToast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleItemSubmit = async (data: EditableItemFormInputs) => {
    const transformedData = { 
      ...data, 
      description: data.description ?? "" 
    };
  
    const result = await updateItem(id?.toString(), transformedData);
    if (result) {
      showToast("Item updated successfully!", "success", 5000);
      navigateTo("/");
    } else {
      showToast(error?.general || "Item update failed.", "error", 5000);
    }
  };

  const handleBackClick = () => {
    navigateTo("/");
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteItem(id?.toString());
    setOpenDeleteDialog(false);
    if (result) {
      showToast("Item deleted successfully!", "success", 5000);
      navigateTo("/");
    } else {
      showToast("Failed to delete item.", "error", 5000);
    }
  };

  React.useEffect(() => {
    if (error?.status === 404) {
      showToast("Item not found", "error", 5000);
      router.push("/not-found");
    } else if (error) {
      showToast(error.message || "Error fetching item", "error", 5000);
    }
  }, [error, router, showToast]);

  return (
    <div>
      {/* Header with Back arrow and Logout button */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <BackArrow onClick={handleBackClick} size="large" />
        <LogoutButton />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : error?.status === 404 ? null : (
          <EditableItemForm
            onSubmit={handleItemSubmit}
            onDelete={handleDeleteClick}
            error={error ? { general: error.message } : null}
            defaultValues={item as EditableItemFormInputs}
          />
        )}
      </Box>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
