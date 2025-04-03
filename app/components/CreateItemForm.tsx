import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { createItemFormSchema, FormInputs } from '../../schemas/item/CreateItemFormSchema';

interface CreateItemFormProps {
  onSubmit: (data: FormInputs) => void;
  error?: { [key: string]: string } | null;
  loading?: boolean;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ onSubmit, error, loading = false }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(createItemFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    }
  });

  const handleFormSubmit = (data: FormInputs) => {
    onSubmit(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '100%',
          sm: 400,
          md: 500,
        },
        margin: '0 auto',
        padding: 3,
        borderRadius: '12px',
        border: '2px solid #ccc',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" mb={2} align="center">
        Create New Item
      </Typography>

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
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field: { name, ref, value, onChange } }) => (
          <TextField
            name={name}
            inputRef={ref}
            value={value}
            onChange={onChange}
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
              min: '0'
            }}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        sx={{
          mt: 2,
          borderRadius: "20px",
          height: "50px",
          py: 2,
        }}
      >
        {loading ? "Submitting" : "Submit"}
      </Button>
    </Box>
  );
};

export default CreateItemForm;
