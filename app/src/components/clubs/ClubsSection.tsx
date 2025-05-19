'use client';

import Card from '../ui/Card';
import { useLanguage } from '@/lib/language';

// Placeholder data - in a real app we would fetch from Supabase
const sampleClubs = [
  {
    id: '1',
    name_en: 'Robotics Club',
    name_az: 'Robotika Klubu',
    description_en: 'Join us to build robots, drones, and automated systems. Regular competitions and workshops for all skill levels.',
    description_az: 'Robotlar, dronlar və avtomatlaşdırılmış sistemlər qurmaq üçün bizə qoşulun. Bütün bacarıq səviyyələri üçün müntəzəm yarışlar və seminarlar.',
    cover_image_url: '/placeholder/club1.svg',
  },
  {
    id: '2',
    name_en: 'Software Innovation Club',
    name_az: 'Proqram Təminatı İnnovasiya Klubu',
    description_en: 'Explore the frontiers of software development, machine learning, and app creation in our collaborative coding community.',
    description_az: 'Əməkdaşlıq edən kodlama cəmiyyətimizdə proqram təminatı inkişafı, maşın öyrənməsi və tətbiq yaratmağın sərhədlərini araşdırın.',
    cover_image_url: '/placeholder/club2.svg',
  },
  {
    id: '3',
    name_en: 'Sustainable Engineering Club',
    name_az: 'Davamlı Mühəndislik Klubu',
    description_en: 'Design and develop environmentally sustainable solutions for real-world problems while learning about green technologies.',
    description_az: 'Yaşıl texnologiyalar haqqında öyrənərkən real problemlər üçün ətraf mühitə davamlı həllər hazırlayın və inkişaf etdirin.',
    cover_image_url: '/placeholder/club3.svg',
  }
];

export default function ClubsSection() {
  const { language } = useLanguage();
  
  return (
    <>
      {sampleClubs.map((club, index) => (
        <Card
          key={club.id}
          title={language === 'en' ? club.name_en : club.name_az}
          description={language === 'en' ? club.description_en : club.description_az}
          image={club.cover_image_url}
          link={`/clubs/${club.id}`}
          index={index}
        />
      ))}
    </>
  );
}
