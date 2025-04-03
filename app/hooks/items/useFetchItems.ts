import { useState, useEffect, useCallback } from 'react';
import { getItems, Item } from '../../../api/item';

interface UseFetchItemsResult {
  items: Item[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

export function useFetchItems(initialPage: number = 1, rowsPerPage: number = 5): UseFetchItemsResult {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await getItems(page, rowsPerPage);
      const { data, meta } = response;
      setItems(data || []);
      setTotalPages(meta.total_pages);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage]);
  
  useEffect(() => {
    fetchItems(page);
  }, [page, fetchItems]);  

  return { items, loading, error, totalPages, page, setPage };
}
