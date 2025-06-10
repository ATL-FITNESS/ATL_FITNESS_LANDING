
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, User, QrCode, Clock, CheckCheck } from 'lucide-react';

// Mock user data
const userData = {
  name: "Samantha Johnson",
  email: "samantha@example.com",
  phone: "(123) 456-7890",
  membership: {
    type: "Premium",
    startDate: "2025-01-15",
    expiryDate: "2025-04-15",
    daysRemaining: 42
  },
  checkIns: [
    { date: "2025-04-27", time: "08:15 AM" },
    { date: "2025-04-25", time: "07:30 AM" },
    { date: "2025-04-23", time: "06:45 AM" },
    { date: "2025-04-21", time: "05:30 PM" },
    { date: "2025-04-19", time: "10:00 AM" }
  ]
};

const Dashboard = () => {
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone
  });
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimationObserver />
      <Navbar />
      
      {/* Dashboard Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto">
          <div className="animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">Welcome, {userData.name}</h1>
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
                        <p className="font-medium text-lg">{userData.membership.type} Membership</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiration Date</p>
                        <p className="font-medium">{new Date(userData.membership.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Days Remaining</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ 
                                width: `${Math.min((userData.membership.daysRemaining / 90) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{userData.membership.daysRemaining}</span>
                        </div>
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
                      Use this to check in at the gym
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-md border mb-4">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SereneFitness-Member-12345" 
                        alt="Membership QR Code" 
                        className="w-40 h-40"
                      />
                    </div>
                    <Button onClick={downloadQRCode} className="w-full">Download QR Code</Button>
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
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Date</th>
                            <th className="text-left py-2 font-medium">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.checkIns.slice(0, 3).map((checkIn, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{new Date(checkIn.date).toLocaleDateString()}</td>
                              <td className="py-2">{checkIn.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={profileData.name} 
                          onChange={handleProfileChange}
                        />
                      </div>
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={profileData.phone} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
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
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Date</th>
                          <th className="text-left py-2 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.checkIns.map((checkIn, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{new Date(checkIn.date).toLocaleDateString()}</td>
                            <td className="py-2">{checkIn.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Total Check-ins This Month:</span>
                      <span className="ml-2 font-medium">{userData.checkIns.length}</span>
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
