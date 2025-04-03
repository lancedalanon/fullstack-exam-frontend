import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemDeleteButton from "./ItemDeleteButton";
import { editItemFormSchema, EditableItemFormInputs } from "../../schemas/item/EditItemFormSchema";

interface ItemFormProps {
  onSubmit: (data: EditableItemFormInputs) => void;
  onDelete: () => void;
  error?: { [key: string]: string } | null;
  defaultValues: EditableItemFormInputs | null;
  loading?: boolean;
}

const EditableItemForm: React.FC<ItemFormProps> = ({ onSubmit, onDelete, error, defaultValues, loading = false }) => {
  const [isEditable, setIsEditable] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditableItemFormInputs>({
    resolver: zodResolver(editItemFormSchema),
    defaultValues: defaultValues ?? { name: "", description: "", price: 0 },
  });

  const handleFormSubmit = (data: EditableItemFormInputs) => {
    // Validation is handled by zod, so we simply pass the data
    onSubmit(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "100%", sm: 400, md: 500 },
        margin: "0 auto",
        padding: 3,
        borderRadius: "12px",
        border: "2px solid #ccc",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" align="center" sx={{ flexGrow: 1 }}>
          {isEditable ? "Edit Item" : "View Item"}
        </Typography>

        {isEditable && <ItemDeleteButton onDelete={onDelete} />}
      </Box>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Item Name"
            variant="outlined"
            fullWidth
            error={!!errors.name || !!error?.name}
            helperText={errors.name?.message || error?.name}
            sx={{ mb: 2, borderRadius: '8px' }}
            InputProps={{ readOnly: !isEditable }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description || !!error?.description}
            helperText={errors.description?.message || error?.description}
            sx={{ mb: 2, borderRadius: '8px' }}
            multiline
            rows={4}
            InputProps={{ readOnly: !isEditable }}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            fullWidth
            error={!!errors.price || !!error?.price}
            helperText={errors.price?.message || error?.price}
            sx={{ mb: 2, borderRadius: '8px' }}
            inputProps={{
              type: 'number',
              placeholder: "0.00",
              step: '0.01',
              min: '0',
            }}
            value={field.value || 0}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        type="button"
        disabled={loading}
        onClick={() => setIsEditable(!isEditable)}
        sx={{
          mt: 2,
          borderRadius: "20px",
          height: "50px",
          py: 2,
        }}
      >
        {isEditable ? "Cancel Edit" : "Edit"}
      </Button>

      {isEditable && (
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={loading}
          sx={{
            mt: 2,
            borderRadius: "20px",
            height: "50px",
            py: 2,
          }}
        >
          
          {loading ? "Saving Changes" : "Save Changes"}
        </Button>
      )}
    </Box>
  );
};

export default EditableItemForm;
