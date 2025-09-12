import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

// Supabase client setup with persistence
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'atl-fitness-auth',
    storage: window.localStorage
  }
});

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [message, setMessage] = useState('Processing your login...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if there are auth parameters in the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('Auth callback params:', { accessToken: !!accessToken, refreshToken: !!refreshToken });

        if (accessToken) {
          // Set the session using the tokens from the URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });

          if (error) {
            console.error('Error setting session:', error);
            setStatus('error');
            setMessage('Failed to establish session. Please try again.');
            setTimeout(() => navigate('/login'), 3000);
            return;
          }

          if (data.session) {
            console.log('Session established successfully:', data.session.user.email);
            setStatus('success');
            setMessage('Login successful! Redirecting to your dashboard...');
            setTimeout(() => navigate('/dashboard'), 1500);
            return;
          }
        }

        // Fallback: try to get existing session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (data.session) {
          console.log('Existing session found:', data.session.user.email);
          setStatus('success');
          setMessage('Login successful! Redirecting to your dashboard...');
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          setStatus('error');
          setMessage('No valid session found. Please try logging in again.');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          {status === 'loading' && (
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          )}
          {status === 'success' && (
            <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="h-12 w-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {status === 'loading' && 'Signing you in...'}
          {status === 'success' && 'Welcome to ATL Fitness!'}
          {status === 'error' && 'Authentication Error'}
        </h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default AuthCallback;