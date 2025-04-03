import { useState } from 'react';
import { createItem, Item } from '../../../api/item';
import { AxiosError } from 'axios';

interface ValidationError {
  field: string;
  message: string;
}

interface AxiosErrorResponse {
  detail: ValidationError[];
}

interface UseCreateItemResult {
  createItem: (item: Omit<Item, 'id'>) => void;
  error: { [key: string]: string } | null;
  loading: boolean;
}

export function useCreateItem(): UseCreateItemResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);

  const handleCreateItem = async (item: Omit<Item, 'id'>) => {
    setLoading(true);
    // Reset errors
    setError(null);
    try {
      await createItem(item);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 422) {
        // Typecast the response data to AxiosErrorResponse
        const responseData = axiosError.response.data as AxiosErrorResponse;

        // Handling 422 error (validation failure)
        const validationErrors: { [key: string]: string } = {};
        responseData.detail.forEach((error) => {
          validationErrors[error.field] = error.message;
        });
        // Set error object with field-specific messages
        setError(validationErrors);
      } else {
        setError({ general: 'Failed to create item. Please try again later.' });
      }
      console.error('Error creating item:', axiosError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createItem: handleCreateItem, loading, error };
}
