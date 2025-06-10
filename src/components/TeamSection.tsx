
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
}

const TeamMember = ({ name, role, image, bio, specialties }: TeamMemberProps) => (
  <Card className="rounded-2xl shadow-md overflow-hidden hover-scale">
    <div className="aspect-[3/4] overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
      />
    </div>
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-playfair">{name}</CardTitle>
      <CardDescription>{role}</CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <p className="text-gray-600 text-sm mb-3">{bio}</p>
      <div>
        <h4 className="text-sm font-medium mb-1">Specialties:</h4>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span 
              key={index} 
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Head Trainer & Fitness Director",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974",
      bio: "With 15+ years in the fitness industry, Alex specializes in strength training and athletic performance. She holds multiple certifications and has trained professional athletes.",
      specialties: ["Strength Training", "Athletic Performance", "Nutrition"]
    },
    {
      name: "Daniel Wilson",
      role: "Yoga & Mindfulness Coach",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070",
      bio: "Daniel brings 10 years of yoga and meditation practice to help members balance physical strength with mental wellbeing. His holistic approach focuses on alignment and breath.",
      specialties: ["Yoga", "Meditation", "Mobility"]
    },
    {
      name: "Sophia Chen",
      role: "Nutrition & Wellness Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
      bio: "A certified nutritionist with a background in sports science, Sophia helps clients optimize their diet to support their fitness goals and overall wellbeing.",
      specialties: ["Nutrition Planning", "Weight Management", "Sports Nutrition"]
    },
    {
      name: "Marcus Johnson",
      role: "Strength & Conditioning Coach",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      bio: "Former competitive weightlifter turned coach, Marcus specializes in helping clients build strength safely and effectively through progressive programming.",
      specialties: ["Powerlifting", "Olympic Lifting", "Functional Strength"]
    }
  ];

  return (
    <section className="py-20 bg-white" id="team">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Our <span className="text-primary">Expert</span> Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our team of certified fitness professionals dedicated to helping you achieve your health and wellness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
