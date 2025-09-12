import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if user is already logged in
    const checkExistingSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session && !error) {
          // User is already logged in, redirect to dashboard
          console.log('Existing session found, redirecting to dashboard');
          navigate('/dashboard');
          return;
        }
      } catch (err) {
        console.error('Error checking session:', err);
      } finally {
        setCheckingSession(false);
      }
    };

    checkExistingSession();
  }, [navigate]);

  useEffect(() => {
    // Check for error from URL params
    const urlError = searchParams.get('error');
    if (urlError === 'not-a-member') {
      setError('This email is not registered as a gym member. Please contact the gym administrator.');
    }
  }, [searchParams]);

  // Show loading while checking for existing session
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Checking login status...</h2>
          <p className="text-gray-600">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Check if Supabase is configured
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Authentication service is not configured');
      }

      // FIRST: Check if user exists in the users table (gym members)
      console.log('Checking if user is registered:', email.trim().toLowerCase());
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, first_name, last_name, email, status')
        .eq('email', email.trim().toLowerCase())
        .single();

      console.log('User lookup result:', { userData, userError });

      if (userError || !userData) {
        // User not found in gym members table
        throw new Error('This email is not registered as a gym member. Please contact the gym administrator to register.');
      }

      // Check if user status is active
      if (userData.status !== 'active') {
        throw new Error(`Your membership status is: ${userData.status}. Please contact the gym administrator.`);
      }

      // User is a valid gym member, now send the magic link
      console.log('Valid gym member found, sending magic link...');
      
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: false, // Only allow existing users
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          // Enable session persistence
          data: {
            remember_me: true
          }
        }
      });

      if (authError) {
        if (authError.message.includes('User not found') || authError.message.includes('Invalid login credentials')) {
          throw new Error('Your email is registered but not set up for login. Please contact the gym administrator.');
        }
        throw authError;
      }

      console.log('Magic link sent successfully');
      setSuccess(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a magic link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Click the link in your email to sign in to your dashboard. The link will expire in 1 hour.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="w-full"
            >
              Try different email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your email to access your ATL Fitness dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Magic Link
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Don't have an account?{' '}
                <span className="text-primary font-medium">
                  Contact the gym administrator
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;