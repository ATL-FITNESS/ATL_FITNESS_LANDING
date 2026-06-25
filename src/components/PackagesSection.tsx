
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

// Database types
type DurationUnit = 'day' | 'week' | 'month' | 'year'
type AccessLevelType = 'off_peak_hours' | 'peak_hours' | 'full_access'

interface Package {
  id: string
  name: string
  price: number
  duration_value: number
  duration_unit: DurationUnit
  access_level: AccessLevelType
  number_of_passes: number
  requires_trainer: boolean
  description: string | null
  created_at: string
  archived: boolean
}

interface PackageCardProps {
  package: Package;
  popular?: boolean;
}

const getAccessLevelDescription = (accessLevel: AccessLevelType): string => {
  switch (accessLevel) {
    case 'off_peak_hours':
      return 'Off-peak hours access (6AM-4PM weekdays)';
    case 'peak_hours':
      return 'Peak hours access (4PM-10PM weekdays, weekends)';
    case 'full_access':
      return '24/7 gym access';
    default:
      return 'Gym access';
  }
};

const getFeatures = (pkg: Package): string[] => {
  const features = [
    getAccessLevelDescription(pkg.access_level),
    `Duration: ${pkg.duration_value} ${pkg.duration_value === 1 ? pkg.duration_unit : pkg.duration_unit + 's'}`,
  ];

  if (pkg.requires_trainer) {
    features.push('Personal trainer included');
  } else {
    features.push('Self-guided training');
  }

  if (pkg.number_of_passes > 0) {
    features.push(`${pkg.number_of_passes} guest passes included`);
  }

  return features;
};

const PackageCard = ({ package: pkg, popular }: PackageCardProps) => {
  const features = getFeatures(pkg);
  const durationText = pkg.duration_value === 1 ? pkg.duration_unit : `${pkg.duration_value} ${pkg.duration_unit}s`;

  return (
    <Card className={`relative rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${popular ? 'border-primary border-2' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-playfair">{pkg.name}</CardTitle>
        <CardDescription className="text-gray-500">
          {pkg.description || `${pkg.access_level.replace('_', ' ')} membership`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-6">
        <div className="mb-6">
          <span className="text-4xl font-semibold">{pkg.price} ETB</span>
          <span className="text-gray-500 ml-2">/ {durationText}</span>
        </div>
        <ul className="space-y-3 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-primary mt-0.5">
                <Check size={16} />
              </span>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full hover:bg-primary/90">Select Package</Button>
      </CardFooter>
    </Card>
  );
};

const PackagesSection = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!isSupabaseConfigured) {
          throw new Error('Supabase configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
        }

        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('archived', false)
          .order('price', { ascending: false });

        if (error) {
          throw new Error(`Database error: ${error.message}`);
        }

        setPackages(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages from database');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50" id="packages">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
              Membership <span className="text-primary">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect membership package to match your fitness goals and lifestyle preferences.
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-600">Loading packages...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50" id="packages">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
              Membership <span className="text-primary">Packages</span>
            </h2>
            <p className="text-red-600 max-w-2xl mx-auto">
              Error loading packages: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Mark the most expensive package as popular (best package)
  const popularPackageIndex = 0; // Since we order by price descending, index 0 is the most expensive

  return (
    <section className="py-20 bg-gray-50" id="packages">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
            Membership <span className="text-primary">Packages</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect membership package to match your fitness goals and lifestyle preferences.
          </p>
        </div>
        
        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={pkg.id} 
                package={pkg} 
                popular={index === popularPackageIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;
