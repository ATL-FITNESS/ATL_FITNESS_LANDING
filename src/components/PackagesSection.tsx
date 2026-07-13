
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const LANDING_PAGE_GYM_ID = '8ff05a6e-615b-437a-a4e5-89cc43206ee3';
const LANDING_DURATION_TARGETS_MONTHS = [1, 6, 12];
const DURATION_SCORE_WEIGHT = 0.7;
const PRICE_SCORE_WEIGHT = 0.3;

// Database types
type DurationUnit = 'day' | 'week' | 'month' | 'year'
type AccessLevelType = 'off_peak_hours' | 'peak_hours' | 'full_access'

interface Package {
  id: string
  gym_id: string
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
  badge?: string;
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

const formatDuration = (value: number, unit: DurationUnit | string): string => {
  const singularUnit = unit.endsWith('s') ? unit.slice(0, -1) : unit;
  return `${value} ${value === 1 ? singularUnit : `${singularUnit}s`}`;
};

const getDurationInMonths = (pkg: Package): number => {
  switch (pkg.duration_unit) {
    case 'day':
      return pkg.duration_value / 30.4375;
    case 'week':
      return (pkg.duration_value * 7) / 30.4375;
    case 'year':
      return pkg.duration_value * 12;
    case 'month':
    default:
      return pkg.duration_value;
  }
};

const selectRepresentativePackages = (packages: Package[], limit: number): Package[] => {
  if (limit <= 0 || packages.length === 0) {
    return [];
  }

  // Keep the lowest-priced package for each duration as the standard candidate.
  const representativesByDuration = new Map<string, Package>();

  packages.forEach((pkg) => {
    const durationKey = getDurationInMonths(pkg).toFixed(4);
    const currentRepresentative = representativesByDuration.get(durationKey);

    if (!currentRepresentative || pkg.price < currentRepresentative.price) {
      representativesByDuration.set(durationKey, pkg);
    }
  });

  const candidates = Array.from(representativesByDuration.values());
  const prices = candidates.map((pkg) => pkg.price);
  const minPrice = Math.min(...prices);
  const priceRange = Math.max(Math.max(...prices) - minPrice, 1);
  const selected: Package[] = [];
  const selectedIds = new Set<string>();

  LANDING_DURATION_TARGETS_MONTHS.forEach((targetMonths) => {
    if (selected.length >= limit) {
      return;
    }

    const availableCandidates = candidates.filter((pkg) => !selectedIds.has(pkg.id));
    if (availableCandidates.length === 0) {
      return;
    }

    const maxDurationDistance = Math.max(
      ...availableCandidates.map((pkg) => Math.abs(getDurationInMonths(pkg) - targetMonths)),
      1,
    );

    const bestMatch = availableCandidates.reduce((best, candidate) => {
      const getScore = (pkg: Package) => {
        const durationScore = Math.abs(getDurationInMonths(pkg) - targetMonths) / maxDurationDistance;
        const priceScore = (pkg.price - minPrice) / priceRange;
        return (durationScore * DURATION_SCORE_WEIGHT) + (priceScore * PRICE_SCORE_WEIGHT);
      };

      return getScore(candidate) < getScore(best) ? candidate : best;
    });

    selected.push(bestMatch);
    selectedIds.add(bestMatch.id);
  });

  return selected.sort((a, b) => getDurationInMonths(a) - getDurationInMonths(b));
};

const getFeatures = (pkg: Package): string[] => {
  const features = [
    getAccessLevelDescription(pkg.access_level),
    `Duration: ${formatDuration(pkg.duration_value, pkg.duration_unit)}`,
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

const PackageCard = ({ package: pkg, badge }: PackageCardProps) => {
  const features = getFeatures(pkg);

  return (
    <Card className={`relative rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${badge ? 'border-primary border-2' : ''}`}>
      {badge && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          {badge}
        </div>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-playfair">{pkg.name}</CardTitle>
        <CardDescription className="text-gray-500">
          {pkg.description || `${pkg.access_level.replace('_', ' ')} membership`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-6">
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
    </Card>
  );
};

interface PackagesSectionProps {
  showHeader?: boolean;
  previewLimit?: number;
  showViewAllLink?: boolean;
}

const PackagesSection = ({
  showHeader = true,
  previewLimit,
  showViewAllLink = false,
}: PackagesSectionProps) => {
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

        let query = supabase
          .from('packages')
          .select('*')
          .eq('gym_id', LANDING_PAGE_GYM_ID)
          .eq('archived', false)
          .order('price', { ascending: false });

        const { data, error } = await query;

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
  }, [previewLimit]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50" id="packages">
        <div className="container mx-auto">
          {showHeader && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
                Membership <span className="text-primary">Packages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the perfect membership package to match your fitness goals and lifestyle preferences.
              </p>
            </div>
          )}
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
          <div className="text-center">
            {showHeader && (
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
                Membership <span className="text-primary">Packages</span>
              </h2>
            )}
            <p className="text-red-600 max-w-2xl mx-auto">
              Error loading packages: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayedPackages = previewLimit
    ? selectRepresentativePackages(packages, previewLimit)
    : packages;

  const recommendedPackageId = previewLimit && displayedPackages.length > 0
    ? displayedPackages.reduce((closest, pkg) => (
        Math.abs(getDurationInMonths(pkg) - 6) < Math.abs(getDurationInMonths(closest) - 6)
          ? pkg
          : closest
      )).id
    : null;

  return (
    <section className="py-20 bg-gray-50" id="packages">
      <div className="container mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
              Membership <span className="text-primary">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect membership package to match your fitness goals and lifestyle preferences.
            </p>
          </div>
        )}
        
        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  badge={pkg.id === recommendedPackageId ? 'RECOMMENDED' : undefined}
                />
              ))}
            </div>

            {showViewAllLink && (
              <div className="mt-10 text-center">
                <Link to="/packages">
                  <Button variant="outline" className="rounded-full px-8">
                    View All Packages
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;
