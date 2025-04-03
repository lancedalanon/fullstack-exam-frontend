import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, outputSchema, FormInputs, FormOutputs } from '../schemas/itemSchemas';

interface CreateItemFormProps {
  onSubmit: (data: FormOutputs) => void;
  error: { [key: string]: string } | null;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ onSubmit, error }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: ''
    }
  });

  const handleFormSubmit = (data: FormInputs) => {
    const transformedData = outputSchema.parse(data);
    onSubmit(transformedData);
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
      <Typography variant="h5" mb={2} align="center">Create New Item</Typography>

      {/* Name Field */}
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
            sx={{
              mb: 2,
              borderRadius: '8px',
            }}
          />
        )}
      />

      {/* Description Field */}
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
            sx={{
              mb: 2,
              borderRadius: '8px',
            }}
            multiline
            rows={4}
          />
        )}
      />

      {/* Price Field */}
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
            sx={{
              mb: 2,
              borderRadius: '8px',
            }}
            inputProps={{
              inputMode: 'decimal',
              placeholder: "0.00"
            }}
            onChange={(e) => {
              // Only allow digits and a single decimal point
              const input = e.target.value;
              const sanitizedInput = input
                .replace(/[^\d.]/g, '') // Remove non-digit/non-decimal characters
                .replace(/(\..*)\./g, '$1'); // Allow only one decimal point
              
              // Limit to 2 decimal places
              const formattedValue = sanitizedInput.replace(/^(\d*\.)(\d{2})\d+$/, '$1$2');
              
              field.onChange(formattedValue);
            }}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          mt: 2,
          borderRadius: "20px",
          height: "50px",
          py: 2,
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateItemForm;
