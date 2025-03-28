
import React from 'react';
import { Film, Instagram, Youtube, Twitter, Facebook, Linkedin, LucideIcon } from 'lucide-react';

interface SocialIconProps {
  iconName: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ iconName, className = "h-4 w-4" }) => {
  const iconMap: Record<string, LucideIcon> = {
    'Film': Film,
    'Instagram': Instagram,
    'Youtube': Youtube,
    'Twitter': Twitter,
    'Facebook': Facebook,
    'Linkedin': Linkedin
  };
  
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent className={className} />;
};

export default SocialIcon;
