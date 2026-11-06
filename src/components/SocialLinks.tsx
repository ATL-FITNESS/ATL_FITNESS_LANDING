import { Instagram } from 'lucide-react';

const links = [
  { name: 'Instagram', href: 'https://www.instagram.com/atl_fitness.official_/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@atl_fitness1' },
];

const SocialLinks = () => (
  <div className="flex flex-wrap gap-4">
    {links.map(({ name, href }) => (
      <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors" aria-label={`ATL Fitness on ${name}`}>
        {name === 'Instagram' ? <Instagram size={20} aria-hidden="true" /> : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.7 2h-3.1v13.3a2.8 2.8 0 1 1-2.8-2.8c.3 0 .5 0 .8.1V9.5a5.9 5.9 0 1 0 5.1 5.8V8.6a8 8 0 0 0 4.7 1.5V7a4.7 4.7 0 0 1-4.7-5Z" />
          </svg>
        )}
        <span>{name}</span>
      </a>
    ))}
  </div>
);

export default SocialLinks;
