import api from '../axios';

// Define the shape of the login request payload
interface LoginRequest {
  username: string;
  password: string;
}

// Define the expected response structure from the API
interface LoginResponse {
  access_token: string;
  token_type: string;
}

/**
 * Sends a login request to the backend API.
 * 
 * @param {LoginRequest} credentials - The user's login details (username & password).
 * @returns {Promise<LoginResponse>} - The response containing the access token and token type.
 * @throws {Error} - Throws an error if the request fails.
 */
export const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
  try {
    // Make a POST request to the /auth/login endpoint with user credentials
    const response = await api.post<LoginResponse>('/api/auth/login', { username, password });
    // Return the API response containing the access token
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Login failed:", error);
    
    // Rethrow the error so it can be handled by the caller
    throw error;
  }
};
