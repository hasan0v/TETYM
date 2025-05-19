'use client';

import Card from '../ui/Card';
import { useLanguage } from '@/lib/language';

// Placeholder data - in a real app we would fetch from Supabase
const sampleIdeas = [
  {
    id: '1',
    title_en: 'Smart Campus Navigation System',
    title_az: 'Ağıllı Kampus Naviqasiya Sistemi',
    description_en: 'A mobile app using AR to help students navigate university buildings, find classes, and discover facilities with real-time information.',
    description_az: 'Tələbələrə universitet binalarında naviqasiya etməyə, dərsləri tapmağa və real vaxt rejimində məlumatlarla obyektləri tapmağa kömək etmək üçün AR istifadə edən mobil tətbiq.',
    cover_image_url: '/placeholder/idea1.svg',
    status: 'approved'
  },
  {
    id: '2',
    title_en: 'Lab Equipment Sharing Platform',
    title_az: 'Laboratoriya Avadanlıqları Paylaşma Platforması',
    description_en: 'A system for different departments to share expensive lab equipment and coordinate usage schedules to maximize research efficiency.',
    description_az: 'Müxtəlif şöbələrin bahalı laboratoriya avadanlıqlarını paylaşması və tədqiqat səmərəliliyini maksimuma çatdırmaq üçün istifadə qrafiklərini əlaqələndirməsi üçün sistem.',
    cover_image_url: '/placeholder/idea2.svg',
    status: 'approved'
  },
  {
    id: '3',
    title_en: 'Renewable Energy Monitoring',
    title_az: 'Bərpa Olunan Enerji Monitorinqi',
    description_en: 'A project to install small renewable energy generators across campus with real-time monitoring of energy production and consumption.',
    description_az: 'Kampusda kiçik bərpa olunan enerji generatorlarını qurmaq və enerjinin istehsalını və istehlakını real vaxt rejimində izləmək üçün layihə.',
    cover_image_url: '/placeholder/idea3.svg',
    status: 'approved'
  }
];

export default function IdeasSection() {
  const { language } = useLanguage();
  
  return (
    <>
      {sampleIdeas.map((idea, index) => (
        <Card
          key={idea.id}
          title={language === 'en' ? idea.title_en : idea.title_az}
          description={language === 'en' ? idea.description_en : idea.description_az}
          image={idea.cover_image_url}
          link={`/ideas/${idea.id}`}
          index={index}
        />
      ))}
    </>
  );
}
