'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/api/auth';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from '@mui/material';

export default function LoginPage() {
  const router = useRouter();

  // Local state for form fields, loading state, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Send login request using our custom axios instance in /api/auth.ts
      const response = await login({ username, password });
      // Store the token in localStorage for future requests
      localStorage.setItem('token', response.access_token);
      // Redirect to home page on successful login
      router.push('/');
    } catch (err) {
      console.error("Login error:", err);
      // Display an error message for the user
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}
    >
      {/* Paper provides a clean, elevated surface */}
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, width: '100%' }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {/* Username Input */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* Password Input */}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Error Message */}
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ 
              mt: 2,
              borderRadius: '20px',
              height: '50px',
              py: 2,
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
