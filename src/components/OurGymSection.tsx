import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const gymImages = [
  {
    src: '/lovable-uploads/gym-brand-screen.jpg',
    alt: 'ATL Fitness branded cardio and training area',
    title: 'Signature Training Space',
  },
  {
    src: '/lovable-uploads/gym-training-floor-wide.jpg',
    alt: 'ATL Fitness open strength training floor',
    title: 'Open Strength Floor',
  },
  {
    src: '/lovable-uploads/gym-main-floor.jpg',
    alt: 'ATL Fitness main gym floor with strength machines',
    title: 'Main Gym Floor',
  },
  {
    src: '/lovable-uploads/gym-strength-lane.jpg',
    alt: 'ATL Fitness strength machines and training lane',
    title: 'Strength Training Lane',
  },
  {
    src: '/lovable-uploads/gym-free-weights-wall.jpg',
    alt: 'ATL Fitness free weights area with dumbbells',
    title: 'Free Weights Zone',
  },
  {
    src: '/lovable-uploads/gym-dumbbell-zone.jpg',
    alt: 'ATL Fitness dumbbell and bench training zone',
    title: 'Dumbbell Zone',
  },
  {
    src: '/lovable-uploads/gym-cardio-row.jpg',
    alt: 'ATL Fitness treadmill cardio row',
    title: 'Cardio Row',
  },
];

const OurGymSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4200);

    return () => window.clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section className="py-20 bg-gray-950 text-white overflow-hidden" id="our-gym">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 animate-on-scroll">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Our Gym
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
              A closer look inside <span className="text-primary">ATL Fitness</span>
            </h2>
            <p className="text-gray-300 max-w-2xl">
              Explore the training spaces, cardio zones, strength equipment, and branded details that shape the ATL Fitness experience.
            </p>
          </div>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          setApi={setApi}
          className="animate-on-scroll"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselContent>
            {gymImages.map((image) => (
              <CarouselItem key={image.src} className="md:basis-4/5 lg:basis-2/3">
                <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h3 className="text-xl md:text-2xl font-playfair font-semibold">
                      {image.title}
                    </h3>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 border-white/20 bg-black/45 text-white hover:bg-white hover:text-gray-950 disabled:opacity-40" />
          <CarouselNext className="right-4 top-1/2 border-white/20 bg-black/45 text-white hover:bg-white hover:text-gray-950 disabled:opacity-40" />
        </Carousel>
      </div>
    </section>
  );
};

export default OurGymSection;
