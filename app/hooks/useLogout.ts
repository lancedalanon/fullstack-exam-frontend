"use client"
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useLogout() {
  const router = useRouter();

  // Create a memoized logout function
  const logout = useCallback(() => {
    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    // Redirect to the login page
    router.push('/auth/login');
  }, [router]);

  return logout;
}
