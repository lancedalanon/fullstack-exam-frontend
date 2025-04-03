import { useState } from 'react';
import { updateItem, Item } from '../../../api/item';
import { AxiosError } from 'axios';

interface ValidationError {
  field: string;
  message: string;
}

interface AxiosErrorResponse {
  detail: ValidationError[];
}

interface UseUpdateItemResult {
  updateItem: (id: number | string | null | undefined, item: Omit<Item, 'id'>) => Promise<boolean>;
  error: { [key: string]: string } | null;
  loading: boolean;
}

export function useUpdateItem(): UseUpdateItemResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);

  const handleUpdateItem = async (id: number | string | null | undefined, item: Omit<Item, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null); // Reset errors

    try {
      await updateItem(id?.toString(), item);
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
        setError(validationErrors);
      } else {
        setError({ general: 'Failed to update item. Please try again later.' });
      }
      console.error('Error updating item:', axiosError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateItem: handleUpdateItem, loading, error };
}
