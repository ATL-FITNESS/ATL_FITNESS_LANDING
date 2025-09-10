import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

// Supabase client setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [message, setMessage] = useState('Processing your login...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (data.session) {
          // User is authenticated, check if they're a gym member
          const userEmail = data.session.user.email;
          
          if (!userEmail) {
            setStatus('error');
            setMessage('No email found. Please try again.');
            setTimeout(() => navigate('/login'), 3000);
            return;
          }

          try {
            // Check if user is a gym member
            // Replace 'members' with your actual members table name
            const { data: memberData, error: memberError } = await supabase
              .from('members')
              .select('id, name, email')
              .eq('email', userEmail)
              .single();

            if (memberError || !memberData) {
              // User exists in auth but not in members table
              setStatus('error');
              setMessage('You are not registered as a gym member. Please contact the gym administrator.');
              
              // Sign out the user since they shouldn't have access
              await supabase.auth.signOut();
              
              setTimeout(() => navigate('/login?error=not-a-member'), 3000);
              return;
            }

            // User is a valid gym member
            setStatus('success');
            setMessage('Login successful! Redirecting to your dashboard...');
            setTimeout(() => navigate('/dashboard'), 2000);

          } catch (err) {
            console.error('Error checking member status:', err);
            // If there's an error checking member status, assume they're valid and proceed
            // You might want to change this behavior based on your security requirements
            setStatus('success');
            setMessage('Login successful! Redirecting to your dashboard...');
            setTimeout(() => navigate('/dashboard'), 2000);
          }
        } else {
          // No session found
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
  }, [navigate]);

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