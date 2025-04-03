"use client";
import * as React from 'react';
import { useAuthProtection } from '../hooks/useAuthProtection';
import LogoutButton from '../components/LogoutButton';
import { Box } from '@mui/material';
import CreateItemForm from '../components/CreateItemForm';
import { useNavigate } from '../hooks/useNavigate';
import BackArrow from '../components/BackArrow';
import { useCreateItem } from '../hooks/items/useCreateItem';
import { useToast } from "../contexts/toastContext";
import { FormInputs } from '../../schemas/item/CreateItemFormSchema';

export default function CreateItem() {
  useAuthProtection();

  const { navigateTo } = useNavigate();
  const { createItem, error, loading } = useCreateItem();
  const { showToast } = useToast();

  const handleItemSubmit = async (data: FormInputs) => {
    try {
      const transformedData = {
        ...data,
        description: data.description ?? ""
      };
      await createItem(transformedData);
      showToast("Item created successfully!", "success", 5000);
      navigateTo("/");
    } catch (error) {
      console.error(error);
      const errorMessage = (error as { general?: string })?.general || "Item creation failed.";
      showToast(errorMessage, "error", 5000);
    }
  };

  const handleBackClick = () => {
    navigateTo('/');
  };

  return (
    <div>
      {/* Back arrow and Logout button */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <BackArrow onClick={handleBackClick} size="large" />
        <LogoutButton />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <CreateItemForm onSubmit={handleItemSubmit} error={error} loading={loading} />
      </Box>
    </div>
  );
}
