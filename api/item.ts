import api from '../axios';

// Define the structure of an Item object
export interface Item {
  id?: number; // Optional ID field (only required for existing items)
  name: string; // Name of the item
  description: string; // Item description
  price: number; // Item price
}

export interface Meta {
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Fetch a paginated list of items.
 * 
 * @param {number} page - The page number to retrieve.
 * @param {number} page_size - The number of items per page.
 * @returns {Promise<{ items: Item[]; meta: Meta[] }>} - A promise resolving to an object containing the items and total count.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getItems = async (page: number, page_size: number): Promise<{ data: Item[]; meta: Meta }> => {
  try {
    const response = await api.get('/api/items', {
      params: { page, page_size }, // Send pagination parameters as query params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Rethrow the error for handling by the caller
  }
};

/**
 * Fetch a single item by its ID.
 * 
 * @param {number | string} id - The ID of the item to retrieve.
 * @returns {Promise<Item>} - A promise resolving to the retrieved item.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getItemById = async (id: number | string | null | undefined): Promise<Item> => {
  try {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new item in the database.
 * 
 * @param {Omit<Item, 'id'>} item - The item data without an ID (since it's assigned by the server).
 * @returns {Promise<Item>} - A promise resolving to the created item.
 * @throws {Error} - Throws an error if the request fails.
 */
export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    const response = await api.post('/api/items', item);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

/**
 * Update an existing item by its ID.
 * 
 * @param {number} id - The ID of the item to update.
 * @param {Omit<Item, 'id'>} item - The updated item data (excluding the ID).
 * @returns {Promise<Item>} - A promise resolving to the updated item.
 * @throws {Error} - Throws an error if the request fails.
 */
export const updateItem = async (id: number | string | null | undefined, item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    const response = await api.put(`/api/items/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete an item from the database by its ID.
 * 
 * @param {number | string} id - The ID of the item to delete.
 * @returns {Promise<{ message: string }>} - A promise resolving to a success message.
 * @throws {Error} - Throws an error if the request fails.
 */
export const deleteItem = async (id: number | string | null | undefined): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with id ${id}:`, error);
    throw error;
  }
};
