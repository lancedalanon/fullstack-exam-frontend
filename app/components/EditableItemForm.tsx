"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemDeleteButton from "./ItemDeleteButton";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .regex(/^\d{1,5}(\.\d{1,2})?$/, "Price can only be from 0 to 99999.99")
    .refine((val) => parseFloat(val) >= 0, "Price must be greater than or equal to 0")
    .refine((val) => parseFloat(val) <= 99999.99, "Price must be less than or equal to 99999.99"),
});

const outputSchema = formSchema.transform((data) => ({
  ...data,
  price: parseFloat(data.price),
}));

type FormInputs = z.infer<typeof formSchema>;
type FormOutputs = z.infer<typeof outputSchema>;

interface ItemFormProps {
  onSubmit: (data: FormOutputs) => void;
  onDelete: () => void;
  error?: { [key: string]: string } | null;
  defaultValues: FormInputs | null;
}

const EditableItemForm: React.FC<ItemFormProps> = ({ onSubmit, onDelete, error, defaultValues }) => {
  const [isEditable, setIsEditable] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? { name: "", description: "", price: "" },
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

        {isEditable && (
          <ItemDeleteButton onDelete={onDelete} />
        )}
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: !isEditable,
              inputMode: "decimal",
            }}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        type="button"
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
          sx={{
            mt: 2,
            borderRadius: "20px",
            height: "50px",
            py: 2,
          }}
        >
          Save Changes
        </Button>
      )}
    </Box>
  );
};

export default EditableItemForm;
