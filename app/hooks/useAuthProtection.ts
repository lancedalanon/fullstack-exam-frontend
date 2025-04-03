import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthProtectionOptions {
  redirectTo?: string;
}

export function useAuthProtection({ redirectTo = '/auth/login' }: UseAuthProtectionOptions = {}): void {
  const router = useRouter();
  
  useEffect(() => {
    // Check for token in localStorage
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Redirect to login page if no token exists
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}