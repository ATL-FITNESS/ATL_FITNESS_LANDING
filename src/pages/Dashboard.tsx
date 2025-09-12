
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, User, QrCode, Clock, CheckCheck, Loader2, LogOut, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

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

interface UserData {
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  package_id: string;
  package_name: string;
  duration_value: number;
  duration_unit: string;
  created_at: string;
  membership_expiry: string;
  status: string;
  date_of_birth: string;
  fitness_goal: string;
  gender: string;
  days_left: number;
  qr_code_data?: string;
}

interface CheckIn {
  id: string;
  checkin_time: string;
  checkin_date: string;
  package_type_at_checkin: string;
  "QR-CODE USED": boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    let mounted = true;
    let hasInitialized = false;

    const fetchUserData = async (session: any) => {
      try {
        // Don't show loading if we already have user data and are just refreshing
        if (!userData) {
          setLoading(true);
        }
        setError(null);

        const userEmail = session.user.email;
        console.log('Fetching data for user:', userEmail);

        // Fetch user data with membership info from the view
        const { data: membershipData, error: membershipError } = await supabase
          .from('users_with_membership_info')
          .select('*')
          .eq('email', userEmail)
          .single();

        if (membershipError) {
          console.error('Error fetching membership data:', membershipError);
          if (mounted) {
            setError('Unable to load user data. Please try again.');
          }
          return;
        }

        // Fetch QR code data from users table
        const { data: qrData, error: qrError } = await supabase
          .from('users')
          .select('qr_code_data')
          .eq('email', userEmail)
          .single();

        // Fetch recent check-ins
        const { data: checkInData, error: checkInError } = await supabase
          .from('client_checkins')
          .select('*')
          .eq('user_id', membershipData.user_id)
          .order('checkin_time', { ascending: false })
          .limit(10);

        if (checkInError) {
          console.error('Error fetching check-ins:', checkInError);
        }

        if (mounted) {
          // Set user data
          setUserData({
            ...membershipData,
            qr_code_data: qrData?.qr_code_data
          });

          // Set check-ins
          setCheckIns(checkInData || []);

          // Set profile data for editing
          setProfileData({
            first_name: membershipData.first_name,
            last_name: membershipData.last_name,
            email: membershipData.email,
            phone: membershipData.phone
          });
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        if (mounted) {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const initializeAuth = async () => {
      try {
        // Check for existing session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          if (mounted) {
            setLoading(false);
            navigate('/login');
          }
          return;
        }

        if (session && mounted) {
          console.log('Found existing session for:', session.user.email);
          hasInitialized = true;
          await fetchUserData(session);
        } else if (mounted) {
          console.log('No existing session found, redirecting to login');
          setLoading(false);
          navigate('/login');
        }

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);
          
          if (event === 'SIGNED_IN' && session && mounted) {
            // User just signed in, fetch their data
            console.log('User signed in, fetching data...');
            if (!hasInitialized) {
              hasInitialized = true;
              await fetchUserData(session);
            }
          } else if (event === 'SIGNED_OUT' && mounted) {
            // User signed out, clear data and redirect
            console.log('User signed out, redirecting to login');
            setUserData(null);
            setCheckIns([]);
            setLoading(false);
            hasInitialized = false;
            navigate('/login');
          } else if (event === 'TOKEN_REFRESHED' && session && hasInitialized) {
            // Token refreshed, just log it - don't refetch data unless necessary
            console.log('Token refreshed for user:', session.user.email);
            // Only refetch if we don't have user data
            if (!userData && mounted) {
              await fetchUserData(session);
            }
          }
        });

        // Store subscription for cleanup
        return subscription;
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setLoading(false);
          navigate('/login');
        }
      }
    };

    // Initialize authentication
    const subscriptionPromise = initializeAuth();

    // Cleanup function
    return () => {
      mounted = false;
      subscriptionPromise.then(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    };
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      navigate('/login');
    }
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };
  
  const downloadQRCode = () => {
    // In a real app, this would generate and download a QR code
    alert("QR Code downloaded successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No User Data Found</h2>
          <p className="text-gray-600 mb-4">Unable to load your dashboard data.</p>
          <Button onClick={() => navigate('/login')}>Back to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <AnimationObserver />
      <Navbar />
      
      {/* Dashboard Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto">
          <div className="animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">
              Welcome, {userData.full_name || `${userData.first_name} ${userData.last_name}`}
            </h1>
            <p className="text-gray-600">
              Manage your membership and track your fitness journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="pb-20">
        <div className="container mx-auto">
          <Tabs defaultValue="overview" className="animate-on-scroll">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="check-ins">Check-ins</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Membership Card */}
                <Card className="rounded-2xl shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="mr-2 text-primary" size={20} />
                      Membership Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Plan</p>
                        <p className="font-medium text-lg">{userData.package_name || 'No Package'} Membership</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiration Date</p>
                        <p className="font-medium">
                          {userData.membership_expiry 
                            ? new Date(userData.membership_expiry).toLocaleDateString() 
                            : 'No expiry date set'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Days Remaining</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ 
                                width: `${Math.min((userData.days_left / 90) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{Math.floor(userData.days_left)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          userData.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {userData.status.toUpperCase()}
                        </span>
                      </div>
                      <Button variant="outline" className="w-full">Renew Membership</Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* QR Code Card */}
                <Card className="rounded-2xl shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <QrCode className="mr-2 text-primary" size={20} />
                      Membership QR Code
                    </CardTitle>
                    <CardDescription>
                      {userData.qr_code_data ? 'Use this to check in at the gym' : 'QR code not available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-md border mb-4">
                      {userData.qr_code_data ? (
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(userData.qr_code_data)}`}
                          alt="Membership QR Code" 
                          className="w-40 h-40"
                        />
                      ) : (
                        <div className="w-40 h-40 flex flex-col items-center justify-center bg-gray-100 rounded-md">
                          <XCircle className="h-16 w-16 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500 text-center">
                            QR Code<br />Unavailable
                          </span>
                        </div>
                      )}
                    </div>
                    {userData.qr_code_data ? (
                      <Button onClick={downloadQRCode} className="w-full">Download QR Code</Button>
                    ) : (
                      <Button disabled className="w-full opacity-50 cursor-not-allowed">
                        QR Code Not Available
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Check-ins */}
                <Card className="rounded-2xl shadow-md md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <CheckCheck className="mr-2 text-primary" size={20} />
                      Recent Check-ins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {checkIns.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Date</th>
                              <th className="text-left py-2 font-medium">Time</th>
                              <th className="text-left py-2 font-medium">QR Used</th>
                            </tr>
                          </thead>
                          <tbody>
                            {checkIns.slice(0, 3).map((checkIn, index) => (
                              <tr key={checkIn.id} className="border-b">
                                <td className="py-2">{new Date(checkIn.checkin_date).toLocaleDateString()}</td>
                                <td className="py-2">{new Date(checkIn.checkin_time).toLocaleTimeString()}</td>
                                <td className="py-2">
                                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                    checkIn["QR-CODE USED"] 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {checkIn["QR-CODE USED"] ? 'Yes' : 'No'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No check-ins recorded yet</p>
                        <p className="text-sm">Start visiting the gym to see your check-in history!</p>
                      </div>
                    )}
                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-primary">View All Check-ins</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 text-primary" size={20} />
                    Personal Profile
                  </CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input 
                          id="first_name" 
                          name="first_name"
                          value={profileData.first_name} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input 
                          id="last_name" 
                          name="last_name"
                          value={profileData.last_name} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={profileData.email} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={profileData.phone} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">Update Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="check-ins">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 text-primary" size={20} />
                    Check-in History
                  </CardTitle>
                  <CardDescription>
                    View your recent gym visits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {checkIns.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Date</th>
                            <th className="text-left py-2 font-medium">Time</th>
                            <th className="text-left py-2 font-medium">QR Used</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checkIns.map((checkIn, index) => (
                            <tr key={checkIn.id} className="border-b">
                              <td className="py-2">{new Date(checkIn.checkin_date).toLocaleDateString()}</td>
                              <td className="py-2">{new Date(checkIn.checkin_time).toLocaleTimeString()}</td>
                              <td className="py-2">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  checkIn["QR-CODE USED"] 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {checkIn["QR-CODE USED"] ? 'Yes' : 'No'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No check-ins recorded yet</p>
                      <p className="text-sm">Start visiting the gym to see your check-in history!</p>
                    </div>
                  )}
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Total Check-ins This Month:</span>
                      <span className="ml-2 font-medium">{checkIns.length}</span>
                    </div>
                    <Button variant="outline">Download History</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
