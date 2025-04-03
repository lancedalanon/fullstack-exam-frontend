import { useState } from 'react';
import { deleteItem } from '../../../api/item';
import { AxiosError } from 'axios';

interface ValidationError {
  field: string;
  message: string;
}

interface AxiosErrorResponse {
  detail: ValidationError[];
}

interface UseDeleteItemResult {
  deleteItem: (id: number | string | null | undefined) => Promise<boolean>;
  loading: boolean;
  error: { [key: string]: string } | null;
}

export function useDeleteItem(): UseDeleteItemResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);

  const handleDeleteItem = async (id: number | string | null | undefined): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteItem(id?.toString());
      return true;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 422) {
        // Typecast the response data to AxiosErrorResponse
        const responseData = axiosError.response.data as AxiosErrorResponse;

        const validationErrors: { [key: string]: string } = {};
        responseData.detail.forEach((error) => {
          validationErrors[error.field] = error.message;
        });
        setError(validationErrors);
      } else {
        setError({ general: 'Failed to delete item. Please try again later.' });
      }
      console.error('Error deleting item:', axiosError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem: handleDeleteItem, loading, error };
}
