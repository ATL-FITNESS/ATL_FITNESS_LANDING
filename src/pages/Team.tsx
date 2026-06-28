
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  certifications: string[];
}

const TeamMember = ({ name, role, image, bio, specialties, certifications }: TeamMemberProps) => (
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
    <CardContent className="pb-4">
      <p className="text-gray-600 text-sm mb-4">{bio}</p>
      <div className="mb-3">
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
      <div>
        <h4 className="text-sm font-medium mb-1">Certifications:</h4>
        <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Head Trainer & Fitness Director",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974",
      bio: "With 15+ years in the fitness industry, Alex specializes in strength training and athletic performance. She holds multiple certifications and has trained professional athletes.",
      specialties: ["Strength Training", "Athletic Performance", "Nutrition"],
      certifications: ["NSCA Certified Strength & Conditioning Specialist", "Precision Nutrition Level 2", "TRX Master Trainer"]
    },
    {
      name: "Daniel Wilson",
      role: "Yoga & Mindfulness Coach",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070",
      bio: "Daniel brings 10 years of yoga and meditation practice to help members balance physical strength with mental wellbeing. His holistic approach focuses on alignment and breath.",
      specialties: ["Yoga", "Meditation", "Mobility"],
      certifications: ["RYT-500 Certified", "Mindfulness-Based Stress Reduction Coach", "FRC Mobility Specialist"]
    },
    {
      name: "Sophia Chen",
      role: "Nutrition & Wellness Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
      bio: "A certified nutritionist with a background in sports science, Sophia helps clients optimize their diet to support their fitness goals and overall wellbeing.",
      specialties: ["Nutrition Planning", "Weight Management", "Sports Nutrition"],
      certifications: ["MS in Nutrition Science", "Certified Sports Nutritionist", "Wellness Coach Certification"]
    },
    {
      name: "Marcus Johnson",
      role: "Strength & Conditioning Coach",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      bio: "Former competitive weightlifter turned coach, Marcus specializes in helping clients build strength safely and effectively through progressive programming.",
      specialties: ["Powerlifting", "Olympic Lifting", "Functional Strength"],
      certifications: ["USAW Level 2 Coach", "ACSM Certified Personal Trainer", "Functional Range Conditioning"]
    },
    {
      name: "Olivia Martinez",
      role: "Group Fitness Instructor",
      image: "https://images.unsplash.com/photo-1569307371632-adf8d1e5459a?q=80&w=1974",
      bio: "Olivia's infectious energy brings life to every class she leads. With a background in dance and athletic training, her classes are challenging yet accessible to all fitness levels.",
      specialties: ["HIIT", "Dance Fitness", "Core Training"],
      certifications: ["ACE Group Fitness Instructor", "Les Mills Certified", "Zumba Licensed Instructor"]
    },
    {
      name: "James Kim",
      role: "Recovery & Mobility Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
      bio: "James combines his knowledge of physical therapy and performance training to help clients recover faster and prevent injuries through targeted mobility work.",
      specialties: ["Injury Prevention", "Corrective Exercise", "Stretch Therapy"],
      certifications: ["NASM Corrective Exercise Specialist", "FMS Level 2", "Licensed Massage Therapist"]
    },
    {
      name: "Aisha Williams",
      role: "Senior Personal Trainer",
      image: "https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?q=80&w=1970",
      bio: "Aisha's methodical approach to training has helped countless clients transform their bodies and health. She specializes in creating sustainable fitness plans for busy professionals.",
      specialties: ["Body Composition", "Functional Training", "Lifestyle Integration"],
      certifications: ["NSCA Certified Personal Trainer", "Precision Nutrition Coach", "TRX Suspension Training"]
    },
    {
      name: "David Thompson",
      role: "Boxing & Functional Training Coach",
      image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=1974",
      bio: "Former professional boxer David brings authentic boxing technique and high-energy training methods to help members improve conditioning, coordination, and mental toughness.",
      specialties: ["Boxing", "Kickboxing", "Circuit Training"],
      certifications: ["USA Boxing Coach", "NASM CPT", "Kettlebell Certification"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <AnimationObserver />
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4">Our <span className="text-primary">Expert</span> Team</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our diverse team of certified fitness professionals dedicated to guiding and supporting your wellness journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <h3 className="text-2xl font-playfair font-semibold mb-4">Join Our Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're always looking for talented fitness professionals to join our team. If you're passionate about helping others achieve their fitness goals and have the credentials to match, we'd love to hear from you.
            </p>
            <a href="/#contact" className="inline-block mt-6 text-primary font-medium hover:underline">Submit your application</a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Team;
