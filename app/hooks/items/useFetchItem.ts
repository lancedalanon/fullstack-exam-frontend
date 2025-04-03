import { useState, useEffect } from 'react';
import { getItemById, Item } from '../../../api/item';
import { AxiosError } from 'axios';

interface ErrorResponseData {
  message: string;
}

interface FetchItemError {
  message: string;
  status?: number;
  general?: string
}

export function useFetchItem(itemId: string | number | null | undefined) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchItemError | null>(null);

  useEffect(() => {
    if (itemId === null) {
      setLoading(false);
      setError({ message: "Invalid item ID", status: 400 });
      return;
    }

    const fetchItem = async () => {
      try {
        const fetchedItem = await getItemById(itemId);
        setItem(fetchedItem);
        setError(null);
      } catch (err) {
        let errorMessage = 'Network error or unexpected error occurred.';
        let statusCode: number | undefined;

        if (err instanceof Error) {
          const axiosError = err as AxiosError<ErrorResponseData>;
          statusCode = axiosError.response?.status;

          if (axiosError.response) {
            errorMessage = `Error fetching item: ${axiosError.response.data?.message || axiosError.message}`;
          } else if (axiosError.request) {
            errorMessage = 'No response received from server';
          } else {
            errorMessage = axiosError.message;
          }
        }

        setError({ 
          message: errorMessage,
          status: statusCode
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  return { item, loading, error };
}