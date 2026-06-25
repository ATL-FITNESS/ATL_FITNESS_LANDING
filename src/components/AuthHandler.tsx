import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    // Handle auth state changes and redirects
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Check if user is a gym member (not admin)
        // You might want to add additional checks here based on your user roles/metadata
        try {
          // Query your members table or check user metadata to ensure they're a gym member
          const { data: memberData, error } = await supabase
            .from('members') // Assuming you have a members table
            .select('id')
            .eq('email', session.user.email)
            .single();

          if (memberData && !error) {
            // User is a valid gym member, redirect to member dashboard
            navigate('/dashboard');
          } else {
            // User exists in auth but not in members table (might be admin)
            // Redirect them away or show error
            navigate('/login?error=not-a-member');
          }
        } catch (err) {
          console.error('Error checking member status:', err);
          // If members table doesn't exist or there's an error, just redirect to dashboard
          navigate('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default AuthHandler;
